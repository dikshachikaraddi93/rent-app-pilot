package com.rentapp.dto.response;

public class ReportSummaryResponse {

    private Double totalCollected;
    private Long totalPayments;
    private Long totalProperties;
    private Long totalTenants;

    public ReportSummaryResponse() {
    }

    public Double getTotalCollected() {
        return totalCollected;
    }

    public void setTotalCollected(Double totalCollected) {
        this.totalCollected = totalCollected;
    }

    public Long getTotalPayments() {
        return totalPayments;
    }

    public void setTotalPayments(Long totalPayments) {
        this.totalPayments = totalPayments;
    }

    public Long getTotalProperties() {
        return totalProperties;
    }

    public void setTotalProperties(Long totalProperties) {
        this.totalProperties = totalProperties;
    }

    public Long getTotalTenants() {
        return totalTenants;
    }

    public void setTotalTenants(Long totalTenants) {
        this.totalTenants = totalTenants;
    }
}