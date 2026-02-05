package com.scooterapp.dto;

import java.util.Set;
import java.util.UUID;

public class UserProfileResponse {
    private UUID id;
    private String fullName;
    private String email;
    private String phoneNumber;
    private boolean kycVerified;
    private Set<String> roles;

    public UserProfileResponse(UUID id, String fullName, String email, String phoneNumber, boolean kycVerified, Set<String> roles) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.kycVerified = kycVerified;
        this.roles = roles;
    }

    public UUID getId() {
        return id;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public boolean isKycVerified() {
        return kycVerified;
    }

    public Set<String> getRoles() {
        return roles;
    }
}
