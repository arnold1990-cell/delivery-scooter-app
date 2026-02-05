package com.scooterapp.controller;

import com.scooterapp.dto.RideRequest;
import com.scooterapp.dto.RideResponse;
import com.scooterapp.service.RideService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/rides")
@PreAuthorize("hasRole('RIDER')")
public class RideController {
    private final RideService rideService;

    public RideController(RideService rideService) {
        this.rideService = rideService;
    }

    @PostMapping("/start")
    @ResponseStatus(HttpStatus.CREATED)
    public RideResponse startRide(Authentication authentication, @Valid @RequestBody RideRequest request) {
        return rideService.startRide(authentication.getName(), request);
    }

    @PostMapping("/{rideId}/end")
    public RideResponse endRide(@PathVariable UUID rideId, @RequestBody Map<String, Double> payload) {
        double latitude = payload.getOrDefault("latitude", 0.0);
        double longitude = payload.getOrDefault("longitude", 0.0);
        return rideService.endRide(rideId, latitude, longitude);
    }

    @GetMapping
    public List<RideResponse> listRides(Authentication authentication) {
        return rideService.listRiderRides(authentication.getName());
    }
}
