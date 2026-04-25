package com.example.kshitiz.server.controllers;

import com.example.kshitiz.server.dto.DashboardDTO;
import com.example.kshitiz.server.services.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/student")
    public ResponseEntity<DashboardDTO> getStudentDashboard(
            @RequestHeader("Authorization") String authorizationHeader
    ) {
        return ResponseEntity.ok(dashboardService.getStudentDashboard(authorizationHeader));
    }

    @GetMapping("/recruiter")
    public ResponseEntity<DashboardDTO> getRecruiterDashboard(
            @RequestHeader("Authorization") String authorizationHeader
    ) {
        return ResponseEntity.ok(dashboardService.getRecruiterDashboard(authorizationHeader));
    }
}
