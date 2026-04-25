package com.example.kshitiz.server.services;

import com.example.kshitiz.server.dto.JobDTO;
import com.example.kshitiz.server.entity.Job;

import java.util.List;

public interface JobService {
    List<JobDTO> getAllJobs(String title, String location, String company, String skills, String jobType, String compensation);
    JobDTO getJobById(Long id);
    JobDTO createJob(String authorizationHeader, JobDTO jobDTO);
    JobDTO updateJob(String authorizationHeader, Long id, JobDTO jobDTO);
    void deleteJob(String authorizationHeader, Long id);
    List<JobDTO> getCurrentRecruiterJobs(String authorizationHeader);
    Job getJobEntity(Long id);
}
