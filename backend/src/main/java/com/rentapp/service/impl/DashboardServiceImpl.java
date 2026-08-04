package com.rentapp.service.impl;

import com.rentapp.dto.response.DashboardResponse;
import com.rentapp.repository.PaymentRepository;
import com.rentapp.repository.PropertyRepository;
import com.rentapp.repository.TenantRepository;
import com.rentapp.service.DashboardService;
import org.springframework.stereotype.Service;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final PropertyRepository propertyRepository;
    private final TenantRepository tenantRepository;
    private final PaymentRepository paymentRepository;

    public DashboardServiceImpl(
            PropertyRepository propertyRepository,
            TenantRepository tenantRepository,
            PaymentRepository paymentRepository) {

        this.propertyRepository = propertyRepository;
        this.tenantRepository = tenantRepository;
        this.paymentRepository = paymentRepository;
    }

    @Override
    public DashboardResponse getDashboardData() {

        DashboardResponse response = new DashboardResponse();

        // Total Counts
        response.setTotalProperties(propertyRepository.count());
        response.setTotalTenants(tenantRepository.count());
        response.setTotalPayments(paymentRepository.count());

        // Payment Summary
        response.setCollected(paymentRepository.getCollectedAmount());
        response.setPending(paymentRepository.getPendingCount());
        response.setOverdue(paymentRepository.getOverdueCount());

        return response;
    }
}