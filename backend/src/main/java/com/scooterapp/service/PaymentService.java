package com.scooterapp.service;

import com.scooterapp.dto.PaymentResponse;
import com.scooterapp.entity.Payment;
import com.scooterapp.entity.Ride;
import com.scooterapp.entity.User;
import com.scooterapp.enums.PaymentStatus;
import com.scooterapp.repository.PaymentRepository;
import com.scooterapp.repository.RideRepository;
import com.scooterapp.repository.UserRepository;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {
    private final PaymentRepository paymentRepository;
    private final RideRepository rideRepository;
    private final UserRepository userRepository;

    public PaymentService(PaymentRepository paymentRepository, RideRepository rideRepository, UserRepository userRepository) {
        this.paymentRepository = paymentRepository;
        this.rideRepository = rideRepository;
        this.userRepository = userRepository;
    }

    public PaymentResponse capturePayment(UUID rideId, String email, String provider) {
        Ride ride = rideRepository.findById(rideId)
                .orElseThrow(() -> new IllegalStateException("Ride not found"));
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("User not found"));
        Payment payment = new Payment();
        payment.setRide(ride);
        payment.setUser(user);
        payment.setAmount(calculateRideCost(ride));
        payment.setProvider(provider == null ? "MOCK" : provider);
        payment.setStatus(PaymentStatus.SUCCESS);
        payment.setExternalReference("PAY-" + ride.getId());
        return toResponse(paymentRepository.save(payment));
    }

    public List<PaymentResponse> listPayments(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("User not found"));
        return paymentRepository.findByUser(user).stream().map(this::toResponse).collect(Collectors.toList());
    }

    private double calculateRideCost(Ride ride) {
        double baseFee = 1.0;
        double perMinute = 0.35;
        double minutes = ride.getDurationSeconds() / 60.0;
        return Math.round((baseFee + (minutes * perMinute)) * 100.0) / 100.0;
    }

    private PaymentResponse toResponse(Payment payment) {
        return new PaymentResponse(
                payment.getId(),
                payment.getRide().getId(),
                payment.getAmount(),
                payment.getStatus(),
                payment.getProvider());
    }
}
