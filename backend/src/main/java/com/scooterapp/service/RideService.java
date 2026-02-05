package com.scooterapp.service;

import com.scooterapp.dto.RideRequest;
import com.scooterapp.dto.RideResponse;
import com.scooterapp.entity.Ride;
import com.scooterapp.entity.Scooter;
import com.scooterapp.entity.User;
import com.scooterapp.enums.RideStatus;
import com.scooterapp.enums.ScooterStatus;
import com.scooterapp.repository.RideRepository;
import com.scooterapp.repository.ScooterRepository;
import com.scooterapp.repository.UserRepository;
import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class RideService {
    private final RideRepository rideRepository;
    private final ScooterRepository scooterRepository;
    private final UserRepository userRepository;

    public RideService(RideRepository rideRepository, ScooterRepository scooterRepository, UserRepository userRepository) {
        this.rideRepository = rideRepository;
        this.scooterRepository = scooterRepository;
        this.userRepository = userRepository;
    }

    public RideResponse startRide(String email, RideRequest request) {
        User rider = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("User not found"));
        Scooter scooter = scooterRepository.findById(request.getScooterId())
                .orElseThrow(() -> new IllegalStateException("Scooter not found"));
        if (scooter.getStatus() != ScooterStatus.AVAILABLE) {
            throw new IllegalStateException("Scooter not available");
        }
        scooter.setStatus(ScooterStatus.IN_USE);
        scooterRepository.save(scooter);

        Ride ride = new Ride();
        ride.setRider(rider);
        ride.setScooter(scooter);
        ride.setStatus(RideStatus.ACTIVE);
        ride.setStartedAt(Instant.now());
        ride.setStartLatitude(request.getStartLatitude());
        ride.setStartLongitude(request.getStartLongitude());
        return toResponse(rideRepository.save(ride));
    }

    public RideResponse endRide(UUID rideId, double endLatitude, double endLongitude) {
        Ride ride = rideRepository.findById(rideId)
                .orElseThrow(() -> new IllegalStateException("Ride not found"));
        ride.setStatus(RideStatus.ENDED);
        ride.setEndedAt(Instant.now());
        ride.setEndLatitude(endLatitude);
        ride.setEndLongitude(endLongitude);
        if (ride.getStartedAt() != null) {
            ride.setDurationSeconds(Duration.between(ride.getStartedAt(), ride.getEndedAt()).toSeconds());
        }
        Scooter scooter = ride.getScooter();
        scooter.setStatus(ScooterStatus.AVAILABLE);
        scooterRepository.save(scooter);
        return toResponse(rideRepository.save(ride));
    }

    public List<RideResponse> listRiderRides(String email) {
        User rider = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("User not found"));
        return rideRepository.findByRider(rider).stream().map(this::toResponse).collect(Collectors.toList());
    }

    private RideResponse toResponse(Ride ride) {
        return new RideResponse(
                ride.getId(),
                ride.getScooter().getId(),
                ride.getStatus(),
                ride.getStartedAt(),
                ride.getEndedAt(),
                ride.getDistanceKm(),
                ride.getDurationSeconds());
    }
}
