package com.example.kshitiz.server.controllers;

import com.example.kshitiz.server.dto.ApplicationDTO;
import com.example.kshitiz.server.dto.ApplicationStatusUpdateDTO;
import com.example.kshitiz.server.services.ApplicationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping("/jobs/{jobId}")
    public ResponseEntity<ApplicationDTO> applyToJob(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable Long jobId
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(applicationService.applyToJob(authorizationHeader, jobId));
    }

    @GetMapping("/mine")
    public ResponseEntity<List<ApplicationDTO>> getStudentApplications(
            @RequestHeader("Authorization") String authorizationHeader
    ) {
        return ResponseEntity.ok(applicationService.getStudentApplications(authorizationHeader));
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<ApplicationDTO>> getApplicationsForJob(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable Long jobId
    ) {
        return ResponseEntity.ok(applicationService.getApplicationsForJob(authorizationHeader, jobId));
    }

    @PutMapping("/{applicationId}/status")
    public ResponseEntity<ApplicationDTO> updateApplicationStatus(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable Long applicationId,
            @RequestBody @Valid ApplicationStatusUpdateDTO updateDTO
    ) {
        return ResponseEntity.ok(applicationService.updateApplicationStatus(authorizationHeader, applicationId, updateDTO));
    }
}
