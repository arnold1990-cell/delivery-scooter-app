package com.scooterapp.service;

import com.scooterapp.dto.ScooterRequest;
import com.scooterapp.dto.ScooterResponse;
import com.scooterapp.entity.Scooter;
import com.scooterapp.enums.ScooterStatus;
import com.scooterapp.repository.ScooterRepository;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class ScooterService {
    private final ScooterRepository scooterRepository;

    public ScooterService(ScooterRepository scooterRepository) {
        this.scooterRepository = scooterRepository;
    }

    public ScooterResponse createScooter(ScooterRequest request) {
        Scooter scooter = new Scooter();
        applyRequest(scooter, request);
        return toResponse(scooterRepository.save(scooter));
    }

    public ScooterResponse updateScooter(UUID id, ScooterRequest request) {
        Scooter scooter = scooterRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Scooter not found"));
        applyRequest(scooter, request);
        return toResponse(scooterRepository.save(scooter));
    }

    public List<ScooterResponse> listAvailableScooters() {
        return scooterRepository.findByStatusAndEnabledTrue(ScooterStatus.AVAILABLE)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<ScooterResponse> listAllScooters() {
        return scooterRepository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    private void applyRequest(Scooter scooter, ScooterRequest request) {
        scooter.setModel(request.getModel());
        scooter.setBatteryLevel(request.getBatteryLevel());
        if (request.getStatus() != null) {
            scooter.setStatus(request.getStatus());
        }
        scooter.setLatitude(request.getLatitude());
        scooter.setLongitude(request.getLongitude());
        scooter.setEnabled(request.isEnabled());
    }

    private ScooterResponse toResponse(Scooter scooter) {
        return new ScooterResponse(
                scooter.getId(),
                scooter.getModel(),
                scooter.getBatteryLevel(),
                scooter.getStatus(),
                scooter.getLatitude(),
                scooter.getLongitude(),
                scooter.isEnabled());
    }
}
