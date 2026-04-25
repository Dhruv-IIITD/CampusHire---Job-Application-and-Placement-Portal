package com.example.kshitiz.server.services;

import com.example.kshitiz.server.dto.AccountType;
import com.example.kshitiz.server.dto.DashboardDTO;
import com.example.kshitiz.server.entity.ApplicationStatus;
import com.example.kshitiz.server.entity.Job;
import com.example.kshitiz.server.entity.Profile;
import com.example.kshitiz.server.entity.User;
import com.example.kshitiz.server.repositories.ApplicationRepository;
import com.example.kshitiz.server.repositories.JobRepository;
import com.example.kshitiz.server.repositories.ProfileRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class DashboardServiceImpl implements DashboardService {

    private final JobRepository jobRepository;
    private final ProfileRepository profileRepository;
    private final ApplicationRepository applicationRepository;
    private final UserService userService;

    public DashboardServiceImpl(
            JobRepository jobRepository,
            ProfileRepository profileRepository,
            ApplicationRepository applicationRepository,
            UserService userService
    ) {
        this.jobRepository = jobRepository;
        this.profileRepository = profileRepository;
        this.applicationRepository = applicationRepository;
        this.userService = userService;
    }

    @Override
    public DashboardDTO getStudentDashboard(String authorizationHeader) {
        User student = userService.getAuthenticatedUser(authorizationHeader, AccountType.STUDENT);
        List<Job> jobs = jobRepository.findAll();
        LocalDate today = LocalDate.now();

        DashboardDTO dto = new DashboardDTO();
        dto.setTotalJobs(jobs.size());
        dto.setActiveJobs(jobs.stream().filter(job -> !job.getDeadline().isBefore(today)).count());

        Profile profile = profileRepository.findByUserId(student.getId()).orElse(null);
        dto.setProfileComplete(profile != null);

        if (profile != null) {
            dto.setTotalApplications(applicationRepository.countByStudentProfileId(profile.getId()));
            dto.setUnderReview(applicationRepository.countByStudentProfileIdAndStatus(profile.getId(), ApplicationStatus.UNDER_REVIEW));
            dto.setShortlisted(applicationRepository.countByStudentProfileIdAndStatus(profile.getId(), ApplicationStatus.SHORTLISTED));
            dto.setInterviews(applicationRepository.countByStudentProfileIdAndStatus(profile.getId(), ApplicationStatus.INTERVIEW));
            dto.setSelected(applicationRepository.countByStudentProfileIdAndStatus(profile.getId(), ApplicationStatus.SELECTED));
            dto.setRejected(applicationRepository.countByStudentProfileIdAndStatus(profile.getId(), ApplicationStatus.REJECTED));
        }

        return dto;
    }

    @Override
    public DashboardDTO getRecruiterDashboard(String authorizationHeader) {
        User recruiter = userService.getAuthenticatedUser(authorizationHeader, AccountType.RECRUITER, AccountType.ADMIN);
        List<Job> jobs = recruiter.getAccountType() == AccountType.ADMIN
                ? jobRepository.findAll()
                : jobRepository.findByPostedByIdOrderByCreatedAtDesc(recruiter.getId());
        LocalDate today = LocalDate.now();

        DashboardDTO dto = new DashboardDTO();
        dto.setTotalJobs(jobs.size());
        dto.setActiveJobs(jobs.stream().filter(job -> !job.getDeadline().isBefore(today)).count());

        if (recruiter.getAccountType() == AccountType.ADMIN) {
            dto.setTotalApplications(applicationRepository.count());
            dto.setUnderReview(applicationRepository.findAll().stream().filter(application -> application.getStatus() == ApplicationStatus.UNDER_REVIEW).count());
            dto.setShortlisted(applicationRepository.findAll().stream().filter(application -> application.getStatus() == ApplicationStatus.SHORTLISTED).count());
            dto.setInterviews(applicationRepository.findAll().stream().filter(application -> application.getStatus() == ApplicationStatus.INTERVIEW).count());
            dto.setSelected(applicationRepository.findAll().stream().filter(application -> application.getStatus() == ApplicationStatus.SELECTED).count());
            dto.setRejected(applicationRepository.findAll().stream().filter(application -> application.getStatus() == ApplicationStatus.REJECTED).count());
        } else {
            dto.setTotalApplications(applicationRepository.countByJobPostedById(recruiter.getId()));
            dto.setUnderReview(applicationRepository.countByJobPostedByIdAndStatus(recruiter.getId(), ApplicationStatus.UNDER_REVIEW));
            dto.setShortlisted(applicationRepository.countByJobPostedByIdAndStatus(recruiter.getId(), ApplicationStatus.SHORTLISTED));
            dto.setInterviews(applicationRepository.countByJobPostedByIdAndStatus(recruiter.getId(), ApplicationStatus.INTERVIEW));
            dto.setSelected(applicationRepository.countByJobPostedByIdAndStatus(recruiter.getId(), ApplicationStatus.SELECTED));
            dto.setRejected(applicationRepository.countByJobPostedByIdAndStatus(recruiter.getId(), ApplicationStatus.REJECTED));
        }

        return dto;
    }
}
