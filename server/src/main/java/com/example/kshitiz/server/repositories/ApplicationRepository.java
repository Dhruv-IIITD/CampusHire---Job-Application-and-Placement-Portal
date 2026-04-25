package com.example.kshitiz.server.repositories;

import com.example.kshitiz.server.entity.Application;
import com.example.kshitiz.server.entity.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    Optional<Application> findByStudentProfileIdAndJobId(Long studentProfileId, Long jobId);
    boolean existsByStudentProfileIdAndJobId(Long studentProfileId, Long jobId);
    List<Application> findByStudentProfileIdOrderByUpdatedAtDesc(Long studentProfileId);
    List<Application> findByJobIdOrderByAppliedAtDesc(Long jobId);
    long countByJobId(Long jobId);
    long countByStudentProfileId(Long studentProfileId);
    long countByStudentProfileIdAndStatus(Long studentProfileId, ApplicationStatus status);
    long countByJobPostedById(Long postedById);
    long countByJobPostedByIdAndStatus(Long postedById, ApplicationStatus status);
}
