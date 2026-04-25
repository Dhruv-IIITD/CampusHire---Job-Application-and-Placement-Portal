package com.example.kshitiz.server.services;

import com.example.kshitiz.server.dto.AccountType;
import com.example.kshitiz.server.dto.ProfileDTO;
import com.example.kshitiz.server.entity.Profile;
import com.example.kshitiz.server.entity.User;
import com.example.kshitiz.server.repositories.ProfileRepository;
import com.example.kshitiz.server.repositories.UserRepository;
import com.example.kshitiz.server.utils.ApiException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProfileServiceImpl implements ProfileService {

    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    public ProfileServiceImpl(ProfileRepository profileRepository, UserRepository userRepository, UserService userService) {
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @Override
    @Transactional(readOnly = true)
    public ProfileDTO getCurrentProfile(String authorizationHeader) {
        User user = userService.getAuthenticatedUser(authorizationHeader, AccountType.STUDENT);

        Profile profile = profileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Student profile not found."));

        return toDto(profile);
    }

    @Override
    public ProfileDTO saveProfile(String authorizationHeader, ProfileDTO profileDTO) {
        User user = userService.getAuthenticatedUser(authorizationHeader, AccountType.STUDENT);

        if (!user.getEmail().equalsIgnoreCase(profileDTO.getEmail())) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Profile email must match the logged-in student.");
        }

        Profile profile = profileRepository.findByUserId(user.getId()).orElseGet(Profile::new);

        user.setName(profileDTO.getName().trim());
        userRepository.save(user);

        profile.setUser(user);
        profile.setName(profileDTO.getName().trim());
        profile.setEmail(user.getEmail());
        profile.setBranch(profileDTO.getBranch().trim());
        profile.setGraduationYear(profileDTO.getGraduationYear());
        profile.setCgpa(profileDTO.getCgpa());
        profile.setSkills(sanitizeSkills(profileDTO.getSkills()));
        profile.setResumeLink(profileDTO.getResumeLink().trim());
        profile.setLinkedInUrl(emptyToNull(profileDTO.getLinkedInUrl()));
        profile.setGithubUrl(emptyToNull(profileDTO.getGithubUrl()));
        profile.setHeadline(emptyToNull(profileDTO.getHeadline()));
        profile.setAbout(emptyToNull(profileDTO.getAbout()));

        Profile savedProfile = profileRepository.save(profile);
        return toDto(savedProfile);
    }

    private ProfileDTO toDto(Profile profile) {
        ProfileDTO dto = new ProfileDTO();
        dto.setId(profile.getId());
        dto.setName(profile.getName());
        dto.setEmail(profile.getEmail());
        dto.setBranch(profile.getBranch());
        dto.setGraduationYear(profile.getGraduationYear());
        dto.setCgpa(profile.getCgpa());
        dto.setSkills(profile.getSkills());
        dto.setResumeLink(profile.getResumeLink());
        dto.setLinkedInUrl(profile.getLinkedInUrl());
        dto.setGithubUrl(profile.getGithubUrl());
        dto.setHeadline(profile.getHeadline());
        dto.setAbout(profile.getAbout());
        dto.setCreatedAt(profile.getCreatedAt());
        dto.setUpdatedAt(profile.getUpdatedAt());
        return dto;
    }

    private List<String> sanitizeSkills(List<String> skills) {
        return skills.stream()
                .map(String::trim)
                .filter(skill -> !skill.isBlank())
                .distinct()
                .collect(Collectors.toList());
    }

    private String emptyToNull(String value) {
        if (value == null) {
            return null;
        }
        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }
}
