package com.scooterapp.dto;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public class RideRequest {
    @NotNull
    private UUID scooterId;

    private double startLatitude;
    private double startLongitude;

    public UUID getScooterId() {
        return scooterId;
    }

    public void setScooterId(UUID scooterId) {
        this.scooterId = scooterId;
    }

    public double getStartLatitude() {
        return startLatitude;
    }

    public void setStartLatitude(double startLatitude) {
        this.startLatitude = startLatitude;
    }

    public double getStartLongitude() {
        return startLongitude;
    }

    public void setStartLongitude(double startLongitude) {
        this.startLongitude = startLongitude;
    }
}
