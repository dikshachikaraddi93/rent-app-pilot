package com.rentapp.service.impl;
import com.rentapp.entity.Tenant;
import com.rentapp.repository.PropertyRepository;
import com.rentapp.repository.TenantRepository;
import com.rentapp.service.TenantService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class TenantServiceImpl implements TenantService {

    private final TenantRepository tenantRepository;
private final PropertyRepository propertyRepository;

public TenantServiceImpl(TenantRepository tenantRepository,
                         PropertyRepository propertyRepository) {
    this.tenantRepository = tenantRepository;
    this.propertyRepository = propertyRepository;
}

    @Override
    public Tenant saveTenant(Tenant tenant) {

    Long propertyId = tenant.getProperty().getId();

    tenant.setProperty(
            propertyRepository.findById(propertyId)
                    .orElseThrow(() -> new RuntimeException("Property not found"))
    );

    return tenantRepository.save(tenant);
    }


    @Override
    public List<Tenant> getAllTenants() {
        return tenantRepository.findAll();
    }

    @Override
    public Optional<Tenant> getTenantById(Long id) {
        return tenantRepository.findById(id);
    }

    @Override
    public Tenant updateTenant(Long id, Tenant tenant) {

        Tenant existingTenant = tenantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tenant not found"));

        existingTenant.setFullName(tenant.getFullName());
        existingTenant.setPhoneNumber(tenant.getPhoneNumber());
        existingTenant.setEmail(tenant.getEmail());
        existingTenant.setAadhaarNumber(tenant.getAadhaarNumber());
        existingTenant.setMonthlyRent(tenant.getMonthlyRent());
        existingTenant.setSecurityDeposit(tenant.getSecurityDeposit());
        existingTenant.setLeaseStartDate(tenant.getLeaseStartDate());
        existingTenant.setLeaseEndDate(tenant.getLeaseEndDate());
        existingTenant.setDueDate(tenant.getDueDate());
        existingTenant.setPaymentStatus(tenant.getPaymentStatus());
        existingTenant.setProperty(tenant.getProperty());

        return tenantRepository.save(existingTenant);
    }

    @Override
    public void deleteTenant(Long id) {
        tenantRepository.deleteById(id);
    }
}