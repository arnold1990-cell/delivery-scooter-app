package com.scooterapp.dto;

import java.util.Set;

public class AuthResponse {
    private String token;
    private Set<String> roles;

    public AuthResponse(String token, Set<String> roles) {
        this.token = token;
        this.roles = roles;
    }

    public String getToken() {
        return token;
    }

    public Set<String> getRoles() {
        return roles;
    }
}
