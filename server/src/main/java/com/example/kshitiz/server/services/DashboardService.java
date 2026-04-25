package com.example.kshitiz.server.services;

import com.example.kshitiz.server.dto.DashboardDTO;

public interface DashboardService {
    DashboardDTO getStudentDashboard(String authorizationHeader);
    DashboardDTO getRecruiterDashboard(String authorizationHeader);
}
