package com.example.kshitiz.server.services;

import com.example.kshitiz.server.dto.ProfileDTO;

public interface ProfileService {
    ProfileDTO getCurrentProfile(String authorizationHeader);
    ProfileDTO saveProfile(String authorizationHeader, ProfileDTO profileDTO);
}
