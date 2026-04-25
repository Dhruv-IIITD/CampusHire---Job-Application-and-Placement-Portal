package com.example.kshitiz.server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardDTO {
    private long totalJobs;
    private long activeJobs;
    private long totalApplications;
    private long underReview;
    private long shortlisted;
    private long interviews;
    private long selected;
    private long rejected;
    private boolean profileComplete;
}
