package com.scooterapp.dto;

import com.scooterapp.enums.RideStatus;
import java.time.Instant;
import java.util.UUID;

public class RideResponse {
    private UUID id;
    private UUID scooterId;
    private RideStatus status;
    private Instant startedAt;
    private Instant endedAt;
    private double distanceKm;
    private long durationSeconds;

    public RideResponse(UUID id, UUID scooterId, RideStatus status, Instant startedAt, Instant endedAt, double distanceKm, long durationSeconds) {
        this.id = id;
        this.scooterId = scooterId;
        this.status = status;
        this.startedAt = startedAt;
        this.endedAt = endedAt;
        this.distanceKm = distanceKm;
        this.durationSeconds = durationSeconds;
    }

    public UUID getId() {
        return id;
    }

    public UUID getScooterId() {
        return scooterId;
    }

    public RideStatus getStatus() {
        return status;
    }

    public Instant getStartedAt() {
        return startedAt;
    }

    public Instant getEndedAt() {
        return endedAt;
    }

    public double getDistanceKm() {
        return distanceKm;
    }

    public long getDurationSeconds() {
        return durationSeconds;
    }
}
