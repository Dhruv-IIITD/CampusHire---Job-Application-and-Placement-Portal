package com.example.kshitiz.server.services;

import com.example.kshitiz.server.dto.AccountType;
import com.example.kshitiz.server.dto.JobDTO;
import com.example.kshitiz.server.entity.Job;
import com.example.kshitiz.server.entity.User;
import com.example.kshitiz.server.repositories.ApplicationRepository;
import com.example.kshitiz.server.repositories.JobRepository;
import com.example.kshitiz.server.utils.ApiException;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
@Transactional
public class JobServiceImpl implements JobService {

    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;
    private final UserService userService;

    public JobServiceImpl(JobRepository jobRepository, ApplicationRepository applicationRepository, UserService userService) {
        this.jobRepository = jobRepository;
        this.applicationRepository = applicationRepository;
        this.userService = userService;
    }

    @Override
    @Transactional(readOnly = true)
    public List<JobDTO> getAllJobs(String title, String location, String company, String skills, String jobType, String compensation) {
        List<Job> jobs = jobRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
        List<String> requestedSkills = parseSkills(skills);

        return jobs.stream()
                .filter(job -> matches(job.getTitle(), title))
                .filter(job -> matches(job.getLocation(), location))
                .filter(job -> matches(job.getCompany(), company))
                .filter(job -> matches(job.getJobType(), jobType))
                .filter(job -> matches(job.getCompensation(), compensation))
                .filter(job -> requestedSkills.isEmpty() || job.getRequiredSkills().stream()
                        .map(this::normalize)
                        .collect(Collectors.toSet())
                        .containsAll(requestedSkills))
                .map(this::toDto)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public JobDTO getJobById(Long id) {
        return toDto(getJobEntity(id));
    }

    @Override
    public JobDTO createJob(String authorizationHeader, JobDTO jobDTO) {
        User user = userService.getAuthenticatedUser(authorizationHeader, AccountType.RECRUITER, AccountType.ADMIN);

        Job job = new Job();
        applyJobDetails(job, jobDTO);
        job.setPostedBy(user);

        Job savedJob = jobRepository.save(job);
        return toDto(savedJob);
    }

    @Override
    public JobDTO updateJob(String authorizationHeader, Long id, JobDTO jobDTO) {
        User user = userService.getAuthenticatedUser(authorizationHeader, AccountType.RECRUITER, AccountType.ADMIN);
        Job existingJob = getJobEntity(id);
        validateOwnership(user, existingJob);

        applyJobDetails(existingJob, jobDTO);
        Job savedJob = jobRepository.save(existingJob);
        return toDto(savedJob);
    }

    @Override
    public void deleteJob(String authorizationHeader, Long id) {
        User user = userService.getAuthenticatedUser(authorizationHeader, AccountType.RECRUITER, AccountType.ADMIN);
        Job existingJob = getJobEntity(id);
        validateOwnership(user, existingJob);
        jobRepository.delete(existingJob);
    }

    @Override
    @Transactional(readOnly = true)
    public List<JobDTO> getCurrentRecruiterJobs(String authorizationHeader) {
        User user = userService.getAuthenticatedUser(authorizationHeader, AccountType.RECRUITER, AccountType.ADMIN);
        return jobRepository.findByPostedByIdOrderByCreatedAtDesc(user.getId()).stream()
                .map(this::toDto)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public Job getJobEntity(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Job not found."));
    }

    private void applyJobDetails(Job job, JobDTO jobDTO) {
        job.setTitle(jobDTO.getTitle().trim());
        job.setCompany(jobDTO.getCompany().trim());
        job.setLocation(jobDTO.getLocation().trim());
        job.setJobType(jobDTO.getJobType().trim());
        job.setCompensation(jobDTO.getCompensation().trim());
        job.setRequiredSkills(jobDTO.getRequiredSkills().stream()
                .map(String::trim)
                .filter(skill -> !skill.isBlank())
                .distinct()
                .toList());
        job.setDescription(jobDTO.getDescription().trim());
        job.setDeadline(jobDTO.getDeadline());
    }

    private JobDTO toDto(Job job) {
        JobDTO dto = new JobDTO();
        dto.setId(job.getId());
        dto.setTitle(job.getTitle());
        dto.setCompany(job.getCompany());
        dto.setLocation(job.getLocation());
        dto.setJobType(job.getJobType());
        dto.setCompensation(job.getCompensation());
        dto.setRequiredSkills(job.getRequiredSkills());
        dto.setDescription(job.getDescription());
        dto.setDeadline(job.getDeadline());
        dto.setCreatedAt(job.getCreatedAt());
        dto.setUpdatedAt(job.getUpdatedAt());
        dto.setPostedById(job.getPostedBy().getId());
        dto.setPostedByName(job.getPostedBy().getName());
        dto.setApplicantCount(applicationRepository.countByJobId(job.getId()));
        return dto;
    }

    private void validateOwnership(User user, Job job) {
        if (user.getAccountType() == AccountType.ADMIN) {
            return;
        }
        if (!job.getPostedBy().getId().equals(user.getId())) {
            throw new ApiException(HttpStatus.FORBIDDEN, "You can manage only your own job postings.");
        }
    }

    private boolean matches(String value, String filter) {
        if (filter == null || filter.isBlank()) {
            return true;
        }
        return normalize(value).contains(normalize(filter));
    }

    private List<String> parseSkills(String skills) {
        if (skills == null || skills.isBlank()) {
            return List.of();
        }
        return Arrays.stream(skills.split(","))
                .map(this::normalize)
                .filter(skill -> !skill.isBlank())
                .toList();
    }

    private String normalize(String value) {
        return value == null ? "" : value.trim().toLowerCase(Locale.ENGLISH);
    }
}
