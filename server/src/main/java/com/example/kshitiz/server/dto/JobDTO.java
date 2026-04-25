package com.example.kshitiz.server.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobDTO {
    private Long id;

    @NotBlank(message = "Job title is required.")
    private String title;

    @NotBlank(message = "Company is required.")
    private String company;

    @NotBlank(message = "Location is required.")
    private String location;

    @NotBlank(message = "Job type is required.")
    private String jobType;

    @NotBlank(message = "Compensation is required.")
    private String compensation;

    @NotEmpty(message = "Please add at least one required skill.")
    private List<String> requiredSkills;

    @NotBlank(message = "Description is required.")
    private String description;

    @NotNull(message = "Deadline is required.")
    @FutureOrPresent(message = "Deadline cannot be in the past.")
    private LocalDate deadline;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String postedByName;
    private Long postedById;
    private long applicantCount;
}
