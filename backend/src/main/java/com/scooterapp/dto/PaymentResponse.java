package com.scooterapp.dto;

import com.scooterapp.enums.PaymentStatus;
import java.util.UUID;

public class PaymentResponse {
    private UUID id;
    private UUID rideId;
    private double amount;
    private PaymentStatus status;
    private String provider;

    public PaymentResponse(UUID id, UUID rideId, double amount, PaymentStatus status, String provider) {
        this.id = id;
        this.rideId = rideId;
        this.amount = amount;
        this.status = status;
        this.provider = provider;
    }

    public UUID getId() {
        return id;
    }

    public UUID getRideId() {
        return rideId;
    }

    public double getAmount() {
        return amount;
    }

    public PaymentStatus getStatus() {
        return status;
    }

    public String getProvider() {
        return provider;
    }
}
