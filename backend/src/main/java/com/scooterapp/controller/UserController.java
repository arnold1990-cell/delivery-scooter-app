package com.scooterapp.controller;

import com.scooterapp.dto.UserProfileResponse;
import com.scooterapp.service.UserService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@PreAuthorize("hasAnyRole('ADMIN','RIDER')")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public UserProfileResponse me(Authentication authentication) {
        return userService.getProfile(authentication);
    }
}
