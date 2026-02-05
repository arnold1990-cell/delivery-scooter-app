package com.scooterapp.controller;

import com.scooterapp.dto.RideResponse;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class RideSocketController {
    @MessageMapping("/rides/status")
    @SendTo("/topic/rides")
    public RideResponse broadcastRideStatus(RideResponse rideResponse) {
        return rideResponse;
    }
}
