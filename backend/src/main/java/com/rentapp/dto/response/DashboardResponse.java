package com.rentapp.dto.response;

public class DashboardResponse {

    private Long totalProperties;
    private Long totalTenants;
    private Long totalPayments;

    private Double collected;
    private Long pending;
    private Long overdue;

    public DashboardResponse() {
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

    public Long getTotalPayments() {
        return totalPayments;
    }

    public void setTotalPayments(Long totalPayments) {
        this.totalPayments = totalPayments;
    }

    public Double getCollected() {
        return collected;
    }

    public void setCollected(Double collected) {
        this.collected = collected;
    }

    public Long getPending() {
        return pending;
    }

    public void setPending(Long pending) {
        this.pending = pending;
    }

    public Long getOverdue() {
        return overdue;
    }

    public void setOverdue(Long overdue) {
        this.overdue = overdue;
    }
}