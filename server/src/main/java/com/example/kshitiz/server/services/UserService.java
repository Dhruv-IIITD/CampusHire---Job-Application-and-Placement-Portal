package com.example.kshitiz.server.services;

import com.example.kshitiz.server.dto.AccountType;
import com.example.kshitiz.server.dto.LoginDTO;
import com.example.kshitiz.server.dto.UserDTO;
import com.example.kshitiz.server.entity.User;

public interface UserService {
    UserDTO registerUser(UserDTO userDTO);
    UserDTO loginUser(LoginDTO loginDTO);
    UserDTO getCurrentUser(String authorizationHeader);
    User getAuthenticatedUser(String authorizationHeader);
    User getAuthenticatedUser(String authorizationHeader, AccountType... allowedRoles);
}
