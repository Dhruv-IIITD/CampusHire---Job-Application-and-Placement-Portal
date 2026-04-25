package com.example.kshitiz.server.controllers;

import com.example.kshitiz.server.dto.ProfileDTO;
import com.example.kshitiz.server.services.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/students")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/profile")
    public ResponseEntity<ProfileDTO> getCurrentProfile(@RequestHeader("Authorization") String authorizationHeader) {
        return ResponseEntity.ok(profileService.getCurrentProfile(authorizationHeader));
    }

    @PutMapping("/profile")
    public ResponseEntity<ProfileDTO> saveProfile(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestBody @jakarta.validation.Valid ProfileDTO profileDTO
    ) {
        return ResponseEntity.ok(profileService.saveProfile(authorizationHeader, profileDTO));
    }
}
