package com.scooterapp.service;

import com.scooterapp.dto.RegisterRequest;
import com.scooterapp.dto.UserProfileResponse;
import com.scooterapp.entity.User;
import com.scooterapp.enums.Role;
import com.scooterapp.repository.UserRepository;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerRider(RegisterRequest request) {
        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail().toLowerCase());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setPhoneNumber(request.getPhoneNumber());
        Role requestedRole = request.getRole() == null ? Role.RIDER : request.getRole();
        user.getRoles().add(requestedRole);
        return userRepository.save(user);
    }

    public UserProfileResponse getProfile(Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalStateException("User not found"));
        Set<String> roles = user.getRoles().stream().map(Enum::name).collect(Collectors.toSet());
        return new UserProfileResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.isKycVerified(),
                roles);
    }
}
