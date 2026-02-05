package com.scooterapp.service;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.scooterapp.entity.Payment;
import com.scooterapp.entity.Ride;
import com.scooterapp.entity.User;
import com.scooterapp.repository.PaymentRepository;
import com.scooterapp.repository.RideRepository;
import com.scooterapp.repository.UserRepository;
import java.util.Optional;
import java.util.UUID;
import org.junit.jupiter.api.Test;

class PaymentServiceTest {
    @Test
    void capturePaymentUsesMockProviderWhenMissing() {
        PaymentRepository paymentRepository = mock(PaymentRepository.class);
        RideRepository rideRepository = mock(RideRepository.class);
        UserRepository userRepository = mock(UserRepository.class);

        Ride ride = new Ride();
        User user = new User();
        UUID rideId = UUID.randomUUID();

        when(rideRepository.findById(rideId)).thenReturn(Optional.of(ride));
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));
        when(paymentRepository.save(org.mockito.ArgumentMatchers.any(Payment.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        PaymentService service = new PaymentService(paymentRepository, rideRepository, userRepository);
        service.capturePayment(rideId, "test@example.com", null);
    }
}
