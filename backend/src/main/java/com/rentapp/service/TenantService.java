package com.rentapp.service;

import com.rentapp.entity.Tenant;

import java.util.List;
import java.util.Optional;

public interface TenantService {

    Tenant saveTenant(Tenant tenant);

    List<Tenant> getAllTenants();

    Optional<Tenant> getTenantById(Long id);

    Tenant updateTenant(Long id, Tenant tenant);

    void deleteTenant(Long id);
}