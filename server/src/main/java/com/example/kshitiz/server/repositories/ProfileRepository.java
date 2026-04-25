package com.example.kshitiz.server.repositories;

import com.example.kshitiz.server.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
    Optional<Profile> findByUserId(Long userId);
    Optional<Profile> findByEmailIgnoreCase(String email);
    boolean existsByUserId(Long userId);
}
