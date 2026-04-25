package com.example.kshitiz.server.dto;

import com.example.kshitiz.server.entity.ApplicationStatus;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationStatusUpdateDTO {
    @NotNull(message = "Application status is required.")
    private ApplicationStatus status;
}
