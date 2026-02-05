package com.scooterapp.controller;

import com.scooterapp.dto.PaymentResponse;
import com.scooterapp.service.PaymentService;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {
    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/rides/{rideId}")
    public PaymentResponse capturePayment(@PathVariable UUID rideId, Authentication authentication, @RequestBody Map<String, String> payload) {
        String provider = payload.get("provider");
        return paymentService.capturePayment(rideId, authentication.getName(), provider);
    }

    @GetMapping
    public List<PaymentResponse> listPayments(Authentication authentication) {
        return paymentService.listPayments(authentication.getName());
    }
}
