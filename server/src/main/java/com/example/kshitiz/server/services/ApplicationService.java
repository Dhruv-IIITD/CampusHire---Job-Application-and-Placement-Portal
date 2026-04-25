package com.example.kshitiz.server.services;

import com.example.kshitiz.server.dto.ApplicationDTO;
import com.example.kshitiz.server.dto.ApplicationStatusUpdateDTO;

import java.util.List;

public interface ApplicationService {
    ApplicationDTO applyToJob(String authorizationHeader, Long jobId);
    List<ApplicationDTO> getStudentApplications(String authorizationHeader);
    List<ApplicationDTO> getApplicationsForJob(String authorizationHeader, Long jobId);
    ApplicationDTO updateApplicationStatus(String authorizationHeader, Long applicationId, ApplicationStatusUpdateDTO updateDTO);
}
