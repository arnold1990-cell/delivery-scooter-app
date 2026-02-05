package com.scooterapp.service;

import com.scooterapp.dto.DashboardMetricsResponse;
import com.scooterapp.enums.ScooterStatus;
import com.scooterapp.repository.PaymentRepository;
import com.scooterapp.repository.RideRepository;
import com.scooterapp.repository.ScooterRepository;
import com.scooterapp.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AdminDashboardService {
    private final RideRepository rideRepository;
    private final UserRepository userRepository;
    private final PaymentRepository paymentRepository;
    private final ScooterRepository scooterRepository;

    public AdminDashboardService(RideRepository rideRepository, UserRepository userRepository, PaymentRepository paymentRepository, ScooterRepository scooterRepository) {
        this.rideRepository = rideRepository;
        this.userRepository = userRepository;
        this.paymentRepository = paymentRepository;
        this.scooterRepository = scooterRepository;
    }

    public DashboardMetricsResponse getMetrics() {
        long totalRides = rideRepository.count();
        long activeUsers = userRepository.count();
        double totalRevenue = paymentRepository.findAll().stream().mapToDouble(payment -> payment.getAmount()).sum();
        long scootersAvailable = scooterRepository.findByStatusAndEnabledTrue(ScooterStatus.AVAILABLE).size();
        return new DashboardMetricsResponse(totalRides, activeUsers, totalRevenue, scootersAvailable);
    }
}
