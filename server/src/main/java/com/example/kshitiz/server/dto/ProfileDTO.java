package com.example.kshitiz.server.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDTO {
    private Long id;

    @NotBlank(message = "Name is required.")
    private String name;

    @Email(message = "Please enter a valid email address.")
    @NotBlank(message = "Email is required.")
    private String email;

    @NotBlank(message = "Branch is required.")
    private String branch;

    @NotNull(message = "Graduation year is required.")
    @Min(value = 2020, message = "Graduation year looks too old for this portal.")
    @Max(value = 2100, message = "Graduation year looks invalid.")
    private Integer graduationYear;

    @NotNull(message = "CGPA is required.")
    @DecimalMin(value = "0.0", inclusive = true, message = "CGPA must be between 0 and 10.")
    @DecimalMax(value = "10.0", inclusive = true, message = "CGPA must be between 0 and 10.")
    private Double cgpa;

    @NotEmpty(message = "Please add at least one skill.")
    private List<String> skills;

    @NotBlank(message = "Resume link is required.")
    @Pattern(
            regexp = "^(https?://).+",
            message = "Resume link must start with http:// or https://."
    )
    private String resumeLink;

    @Pattern(
            regexp = "^(|https?://.+)$",
            message = "LinkedIn link must start with http:// or https://."
    )
    private String linkedInUrl;

    @Pattern(
            regexp = "^(|https?://.+)$",
            message = "GitHub link must start with http:// or https://."
    )
    private String githubUrl;

    private String headline;
    private String about;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
