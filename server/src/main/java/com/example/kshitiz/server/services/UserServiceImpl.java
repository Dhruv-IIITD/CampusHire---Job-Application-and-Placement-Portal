package com.example.kshitiz.server.services;

import com.example.kshitiz.server.dto.AccountType;
import com.example.kshitiz.server.dto.LoginDTO;
import com.example.kshitiz.server.dto.UserDTO;
import com.example.kshitiz.server.entity.User;
import com.example.kshitiz.server.repositories.UserRepository;
import com.example.kshitiz.server.utils.ApiException;
import com.example.kshitiz.server.utils.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public UserDTO registerUser(UserDTO userDTO) {
        String email = userDTO.getEmail().trim().toLowerCase();
        if (userRepository.existsByEmailIgnoreCase(email)) {
            throw new ApiException(HttpStatus.CONFLICT, "An account with this email already exists.");
        }

        User user = new User();
        user.setName(userDTO.getName().trim());
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setAccountType(userDTO.getAccountType());

        User savedUser = userRepository.save(user);
        return toDto(savedUser, true);
    }

    @Override
    public UserDTO loginUser(LoginDTO loginDTO) {
        User user = userRepository.findByEmailIgnoreCase(loginDTO.getEmail().trim())
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "Invalid email or password."));

        if (!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, "Invalid email or password.");
        }

        return toDto(user, true);
    }

    @Override
    @Transactional(readOnly = true)
    public UserDTO getCurrentUser(String authorizationHeader) {
        User user = getAuthenticatedUser(authorizationHeader);
        return toDto(user, true);
    }

    @Override
    @Transactional(readOnly = true)
    public User getAuthenticatedUser(String authorizationHeader) {
        String token = extractToken(authorizationHeader);
        String email = jwtUtil.extractEmail(token);

        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "Invalid authentication token."));

        if (!jwtUtil.isTokenValid(token, user)) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, "Session expired. Please log in again.");
        }

        return user;
    }

    @Override
    @Transactional(readOnly = true)
    public User getAuthenticatedUser(String authorizationHeader, AccountType... allowedRoles) {
        User user = getAuthenticatedUser(authorizationHeader);
        if (allowedRoles != null && allowedRoles.length > 0) {
            boolean allowed = Arrays.stream(allowedRoles).anyMatch(role -> role == user.getAccountType());
            if (!allowed) {
                throw new ApiException(HttpStatus.FORBIDDEN, "You are not allowed to perform this action.");
            }
        }
        return user;
    }

    private UserDTO toDto(User user, boolean includeToken) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setAccountType(user.getAccountType());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setPassword(null);
        if (includeToken) {
            dto.setJwtToken(jwtUtil.generateToken(user));
        }
        return dto;
    }

    private String extractToken(String authorizationHeader) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, "Authorization token is missing.");
        }
        return authorizationHeader.substring(7);
    }
}
