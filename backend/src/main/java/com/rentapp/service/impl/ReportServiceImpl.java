package com.rentapp.service.impl;

import com.rentapp.dto.response.ReportSummaryResponse;
import com.rentapp.repository.PaymentRepository;
import com.rentapp.repository.PropertyRepository;
import com.rentapp.repository.TenantRepository;
import com.rentapp.service.ReportService;
import org.springframework.stereotype.Service;

@Service
public class ReportServiceImpl implements ReportService {

    private final PaymentRepository paymentRepository;
    private final PropertyRepository propertyRepository;
    private final TenantRepository tenantRepository;

    public ReportServiceImpl(
            PaymentRepository paymentRepository,
            PropertyRepository propertyRepository,
            TenantRepository tenantRepository) {

        this.paymentRepository = paymentRepository;
        this.propertyRepository = propertyRepository;
        this.tenantRepository = tenantRepository;
    }

    @Override
    public ReportSummaryResponse getSummary() {

        ReportSummaryResponse response = new ReportSummaryResponse();

        response.setTotalCollected(paymentRepository.getCollectedAmount());
        response.setTotalPayments(paymentRepository.count());
        response.setTotalProperties(propertyRepository.count());
        response.setTotalTenants(tenantRepository.count());

        return response;
    }
}