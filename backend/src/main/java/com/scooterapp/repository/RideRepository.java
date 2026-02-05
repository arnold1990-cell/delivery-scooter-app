package com.scooterapp.repository;

import com.scooterapp.entity.Ride;
import com.scooterapp.entity.User;
import com.scooterapp.enums.RideStatus;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RideRepository extends JpaRepository<Ride, UUID> {
    List<Ride> findByRider(User rider);
    List<Ride> findByStatus(RideStatus status);
}
