package com.example.kshitiz.server.dto;

import com.example.kshitiz.server.entity.ApplicationStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationDTO {
    private Long id;
    private Long jobId;
    private String jobTitle;
    private String company;
    private Long studentId;
    private String studentName;
    private String studentEmail;
    private String branch;
    private Integer graduationYear;
    private Double cgpa;
    private List<String> skills;
    private String resumeLink;
    private String linkedInUrl;
    private String githubUrl;
    private ApplicationStatus status;
    private LocalDateTime appliedAt;
    private LocalDateTime updatedAt;
}
