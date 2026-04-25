package com.example.kshitiz.server.services;

import com.example.kshitiz.server.dto.AccountType;
import com.example.kshitiz.server.dto.ApplicationDTO;
import com.example.kshitiz.server.dto.ApplicationStatusUpdateDTO;
import com.example.kshitiz.server.entity.Application;
import com.example.kshitiz.server.entity.Job;
import com.example.kshitiz.server.entity.Profile;
import com.example.kshitiz.server.entity.User;
import com.example.kshitiz.server.repositories.ApplicationRepository;
import com.example.kshitiz.server.repositories.JobRepository;
import com.example.kshitiz.server.repositories.ProfileRepository;
import com.example.kshitiz.server.utils.ApiException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class ApplicationServiceImpl implements ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final ProfileRepository profileRepository;
    private final JobRepository jobRepository;
    private final UserService userService;

    public ApplicationServiceImpl(
            ApplicationRepository applicationRepository,
            ProfileRepository profileRepository,
            JobRepository jobRepository,
            UserService userService
    ) {
        this.applicationRepository = applicationRepository;
        this.profileRepository = profileRepository;
        this.jobRepository = jobRepository;
        this.userService = userService;
    }

    @Override
    public ApplicationDTO applyToJob(String authorizationHeader, Long jobId) {
        User student = userService.getAuthenticatedUser(authorizationHeader, AccountType.STUDENT);
        Profile profile = profileRepository.findByUserId(student.getId())
                .orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "Please complete your student profile before applying."));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Job not found."));

        if (job.getDeadline().isBefore(LocalDate.now())) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "The application deadline has already passed.");
        }

        if (applicationRepository.existsByStudentProfileIdAndJobId(profile.getId(), jobId)) {
            throw new ApiException(HttpStatus.CONFLICT, "You have already applied to this job.");
        }

        Application application = new Application();
        application.setStudentProfile(profile);
        application.setJob(job);

        Application savedApplication = applicationRepository.save(application);
        return toDto(savedApplication);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ApplicationDTO> getStudentApplications(String authorizationHeader) {
        User student = userService.getAuthenticatedUser(authorizationHeader, AccountType.STUDENT);
        return profileRepository.findByUserId(student.getId())
                .map(profile -> applicationRepository.findByStudentProfileIdOrderByUpdatedAtDesc(profile.getId()).stream()
                        .map(this::toDto)
                        .toList())
                .orElse(List.of());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ApplicationDTO> getApplicationsForJob(String authorizationHeader, Long jobId) {
        User recruiter = userService.getAuthenticatedUser(authorizationHeader, AccountType.RECRUITER, AccountType.ADMIN);
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Job not found."));

        validateRecruiterAccess(recruiter, job);

        return applicationRepository.findByJobIdOrderByAppliedAtDesc(jobId).stream()
                .map(this::toDto)
                .toList();
    }

    @Override
    public ApplicationDTO updateApplicationStatus(String authorizationHeader, Long applicationId, ApplicationStatusUpdateDTO updateDTO) {
        User recruiter = userService.getAuthenticatedUser(authorizationHeader, AccountType.RECRUITER, AccountType.ADMIN);
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Application not found."));

        validateRecruiterAccess(recruiter, application.getJob());

        application.setStatus(updateDTO.getStatus());
        Application updatedApplication = applicationRepository.save(application);
        return toDto(updatedApplication);
    }

    private void validateRecruiterAccess(User recruiter, Job job) {
        if (recruiter.getAccountType() == AccountType.ADMIN) {
            return;
        }
        if (!job.getPostedBy().getId().equals(recruiter.getId())) {
            throw new ApiException(HttpStatus.FORBIDDEN, "You can only view applicants for your own jobs.");
        }
    }

    private ApplicationDTO toDto(Application application) {
        Profile profile = application.getStudentProfile();
        Job job = application.getJob();

        ApplicationDTO dto = new ApplicationDTO();
        dto.setId(application.getId());
        dto.setJobId(job.getId());
        dto.setJobTitle(job.getTitle());
        dto.setCompany(job.getCompany());
        dto.setStudentId(profile.getUser().getId());
        dto.setStudentName(profile.getName());
        dto.setStudentEmail(profile.getEmail());
        dto.setBranch(profile.getBranch());
        dto.setGraduationYear(profile.getGraduationYear());
        dto.setCgpa(profile.getCgpa());
        dto.setSkills(profile.getSkills());
        dto.setResumeLink(profile.getResumeLink());
        dto.setLinkedInUrl(profile.getLinkedInUrl());
        dto.setGithubUrl(profile.getGithubUrl());
        dto.setStatus(application.getStatus());
        dto.setAppliedAt(application.getAppliedAt());
        dto.setUpdatedAt(application.getUpdatedAt());
        return dto;
    }
}
