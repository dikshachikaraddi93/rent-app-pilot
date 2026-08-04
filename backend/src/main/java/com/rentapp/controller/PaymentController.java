package com.rentapp.controller;

import com.rentapp.dto.request.PaymentRequest;
import com.rentapp.entity.Payment;
import com.rentapp.entity.Tenant;
import com.rentapp.repository.TenantRepository;
import com.rentapp.service.PaymentService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:5173")
public class PaymentController {

    private final PaymentService paymentService;
    private final TenantRepository tenantRepository;

    public PaymentController(PaymentService paymentService,
                             TenantRepository tenantRepository) {
        this.paymentService = paymentService;
        this.tenantRepository = tenantRepository;
    }

    @PostMapping
    public Payment savePayment(@Valid @RequestBody PaymentRequest request) {

        Tenant tenant = tenantRepository.findById(request.getTenantId())
                .orElseThrow(() -> new RuntimeException("Tenant not found"));

        Payment payment = new Payment();

        payment.setAmount(request.getAmount());
        payment.setPaymentDate(request.getPaymentDate());
        payment.setPaymentMode(request.getPaymentMode());
        payment.setPaymentStatus(request.getPaymentStatus());
        payment.setRemarks(request.getRemarks());
        payment.setTenant(tenant);

        return paymentService.savePayment(payment);
    }

    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }

    @GetMapping("/{id}")
    public Optional<Payment> getPaymentById(@PathVariable Long id) {
        return paymentService.getPaymentById(id);
    }

    @PutMapping("/{id}")
    public Payment updatePayment(@PathVariable Long id,
                                 @Valid @RequestBody PaymentRequest request) {

        Tenant tenant = tenantRepository.findById(request.getTenantId())
                .orElseThrow(() -> new RuntimeException("Tenant not found"));

        Payment payment = new Payment();

        payment.setAmount(request.getAmount());
        payment.setPaymentDate(request.getPaymentDate());
        payment.setPaymentMode(request.getPaymentMode());
        payment.setPaymentStatus(request.getPaymentStatus());
        payment.setRemarks(request.getRemarks());
        payment.setTenant(tenant);

        return paymentService.updatePayment(id, payment);
    }

    @DeleteMapping("/{id}")
    public String deletePayment(@PathVariable Long id) {
        paymentService.deletePayment(id);
        return "Payment deleted successfully.";
    }
}