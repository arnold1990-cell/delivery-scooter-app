package com.scooterapp.repository;

import com.scooterapp.entity.Scooter;
import com.scooterapp.enums.ScooterStatus;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScooterRepository extends JpaRepository<Scooter, UUID> {
    List<Scooter> findByStatusAndEnabledTrue(ScooterStatus status);
}
