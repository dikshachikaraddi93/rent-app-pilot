package com.rentapp.controller;

import com.rentapp.dto.request.TenantRequest;
import com.rentapp.entity.Property;
import com.rentapp.entity.Tenant;
import com.rentapp.repository.PropertyRepository;
import com.rentapp.service.TenantService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tenants")
@CrossOrigin(origins = "http://localhost:5173")
public class TenantController {

    private final TenantService tenantService;
    private final PropertyRepository propertyRepository;

    public TenantController(TenantService tenantService,
                            PropertyRepository propertyRepository) {
        this.tenantService = tenantService;
        this.propertyRepository = propertyRepository;
    }

    @PostMapping
    public Tenant saveTenant(@Valid @RequestBody TenantRequest request) {

        Property property = propertyRepository.findById(request.getPropertyId())
                .orElseThrow(() -> new RuntimeException("Property not found"));

        Tenant tenant = new Tenant();

        tenant.setFullName(request.getFullName());
        tenant.setPhoneNumber(request.getPhoneNumber());
        tenant.setEmail(request.getEmail());
        tenant.setAadhaarNumber(request.getAadhaarNumber());
        tenant.setMonthlyRent(request.getMonthlyRent());
        tenant.setSecurityDeposit(request.getSecurityDeposit());
        tenant.setLeaseStartDate(request.getLeaseStartDate());
        tenant.setLeaseEndDate(request.getLeaseEndDate());
        tenant.setDueDate(request.getDueDate());
        tenant.setPaymentStatus(request.getPaymentStatus());
        tenant.setProperty(property);

        return tenantService.saveTenant(tenant);
    }

    @GetMapping
    public List<Tenant> getAllTenants() {
        return tenantService.getAllTenants();
    }

    @GetMapping("/{id}")
    public Optional<Tenant> getTenantById(@PathVariable Long id) {
        return tenantService.getTenantById(id);
    }

    @PutMapping("/{id}")
    public Tenant updateTenant(@PathVariable Long id,
                               @Valid @RequestBody TenantRequest request) {

        Property property = propertyRepository.findById(request.getPropertyId())
                .orElseThrow(() -> new RuntimeException("Property not found"));

        Tenant tenant = new Tenant();

        tenant.setFullName(request.getFullName());
        tenant.setPhoneNumber(request.getPhoneNumber());
        tenant.setEmail(request.getEmail());
        tenant.setAadhaarNumber(request.getAadhaarNumber());
        tenant.setMonthlyRent(request.getMonthlyRent());
        tenant.setSecurityDeposit(request.getSecurityDeposit());
        tenant.setLeaseStartDate(request.getLeaseStartDate());
        tenant.setLeaseEndDate(request.getLeaseEndDate());
        tenant.setDueDate(request.getDueDate());
        tenant.setPaymentStatus(request.getPaymentStatus());
        tenant.setProperty(property);

        return tenantService.updateTenant(id, tenant);
    }

    @DeleteMapping("/{id}")
    public String deleteTenant(@PathVariable Long id) {
        tenantService.deleteTenant(id);
        return "Tenant deleted successfully.";
    }
}