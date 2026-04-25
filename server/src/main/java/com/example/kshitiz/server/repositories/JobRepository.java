package com.example.kshitiz.server.repositories;

import com.example.kshitiz.server.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByPostedByIdOrderByCreatedAtDesc(Long userId);
    long countByPostedById(Long userId);
}
