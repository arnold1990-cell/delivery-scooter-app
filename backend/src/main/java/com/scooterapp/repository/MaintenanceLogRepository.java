package com.scooterapp.repository;

import com.scooterapp.entity.MaintenanceLog;
import com.scooterapp.entity.Scooter;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MaintenanceLogRepository extends JpaRepository<MaintenanceLog, UUID> {
    List<MaintenanceLog> findByScooter(Scooter scooter);
}
