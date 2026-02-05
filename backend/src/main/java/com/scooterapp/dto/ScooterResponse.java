package com.scooterapp.dto;

import com.scooterapp.enums.ScooterStatus;
import java.util.UUID;

public class ScooterResponse {
    private UUID id;
    private String model;
    private int batteryLevel;
    private ScooterStatus status;
    private double latitude;
    private double longitude;
    private boolean enabled;

    public ScooterResponse(UUID id, String model, int batteryLevel, ScooterStatus status, double latitude, double longitude, boolean enabled) {
        this.id = id;
        this.model = model;
        this.batteryLevel = batteryLevel;
        this.status = status;
        this.latitude = latitude;
        this.longitude = longitude;
        this.enabled = enabled;
    }

    public UUID getId() {
        return id;
    }

    public String getModel() {
        return model;
    }

    public int getBatteryLevel() {
        return batteryLevel;
    }

    public ScooterStatus getStatus() {
        return status;
    }

    public double getLatitude() {
        return latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public boolean isEnabled() {
        return enabled;
    }
}
