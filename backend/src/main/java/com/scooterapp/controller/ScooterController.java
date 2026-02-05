package com.scooterapp.controller;

import com.scooterapp.dto.ScooterRequest;
import com.scooterapp.dto.ScooterResponse;
import com.scooterapp.service.ScooterService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/scooters")
public class ScooterController {
    private final ScooterService scooterService;

    public ScooterController(ScooterService scooterService) {
        this.scooterService = scooterService;
    }

    @GetMapping
    public List<ScooterResponse> listScooters() {
        return scooterService.listAllScooters();
    }

    @GetMapping("/available")
    public List<ScooterResponse> listAvailableScooters() {
        return scooterService.listAvailableScooters();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    public ScooterResponse createScooter(@Valid @RequestBody ScooterRequest request) {
        return scooterService.createScooter(request);
    }

    @PutMapping("/{scooterId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ScooterResponse updateScooter(@PathVariable UUID scooterId, @Valid @RequestBody ScooterRequest request) {
        return scooterService.updateScooter(scooterId, request);
    }
}
