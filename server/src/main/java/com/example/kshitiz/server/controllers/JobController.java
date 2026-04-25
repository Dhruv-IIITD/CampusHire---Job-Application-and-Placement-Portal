package com.example.kshitiz.server.controllers;

import com.example.kshitiz.server.dto.JobDTO;
import com.example.kshitiz.server.services.JobService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @GetMapping
    public ResponseEntity<List<JobDTO>> getJobs(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String company,
            @RequestParam(required = false) String skills,
            @RequestParam(required = false) String jobType,
            @RequestParam(required = false) String compensation
    ) {
        return ResponseEntity.ok(jobService.getAllJobs(title, location, company, skills, jobType, compensation));
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobDTO> getJobById(@PathVariable Long id) {
        return ResponseEntity.ok(jobService.getJobById(id));
    }

    @GetMapping("/mine")
    public ResponseEntity<List<JobDTO>> getCurrentRecruiterJobs(@RequestHeader("Authorization") String authorizationHeader) {
        return ResponseEntity.ok(jobService.getCurrentRecruiterJobs(authorizationHeader));
    }

    @PostMapping
    public ResponseEntity<JobDTO> createJob(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestBody @Valid JobDTO jobDTO
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(jobService.createJob(authorizationHeader, jobDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobDTO> updateJob(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable Long id,
            @RequestBody @Valid JobDTO jobDTO
    ) {
        return ResponseEntity.ok(jobService.updateJob(authorizationHeader, id, jobDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable Long id
    ) {
        jobService.deleteJob(authorizationHeader, id);
        return ResponseEntity.noContent().build();
    }
}
