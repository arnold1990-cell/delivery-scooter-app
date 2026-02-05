package com.scooterapp.service;

import com.scooterapp.dto.AuthResponse;
import com.scooterapp.entity.User;
import com.scooterapp.repository.UserRepository;
import com.scooterapp.security.JwtService;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    public AuthService(AuthenticationManager authenticationManager, JwtService jwtService, UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    public AuthResponse login(String email, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password));
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalStateException("User not found"));
        List<String> roles = user.getRoles().stream().map(Enum::name).toList();
        String token = jwtService.generateToken(user.getEmail(), roles);
        Set<String> roleSet = roles.stream().collect(Collectors.toSet());
        return new AuthResponse(token, roleSet);
    }
}
