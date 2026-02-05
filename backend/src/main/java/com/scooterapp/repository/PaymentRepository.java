package com.scooterapp.repository;

import com.scooterapp.entity.Payment;
import com.scooterapp.entity.User;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, UUID> {
    List<Payment> findByUser(User user);
}
