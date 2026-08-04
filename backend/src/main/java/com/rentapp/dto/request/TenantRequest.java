package com.rentapp.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class TenantRequest {

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must contain exactly 10 digits")
    private String phoneNumber;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email address")
    private String email;

    @NotBlank(message = "Aadhaar number is required")
    @Pattern(regexp = "^[0-9]{12}$", message = "Aadhaar number must contain exactly 12 digits")
    private String aadhaarNumber;

    @NotNull(message = "Monthly rent is required")
    @DecimalMin(value = "0.01", message = "Monthly rent must be greater than 0")
    private Double monthlyRent;

    @NotNull(message = "Security deposit is required")
    @DecimalMin(value = "0.00", message = "Security deposit cannot be negative")
    private Double securityDeposit;

    @NotBlank(message = "Lease start date is required")
    private String leaseStartDate;

    @NotBlank(message = "Lease end date is required")
    private String leaseEndDate;

    @NotBlank(message = "Due date is required")
    private String dueDate;

    @NotBlank(message = "Payment status is required")
    private String paymentStatus;

    @NotNull(message = "Property ID is required")
    private Long propertyId;

    public TenantRequest() {
    }

    public TenantRequest(String fullName,
                         String phoneNumber,
                         String email,
                         String aadhaarNumber,
                         Double monthlyRent,
                         Double securityDeposit,
                         String leaseStartDate,
                         String leaseEndDate,
                         String dueDate,
                         String paymentStatus,
                         Long propertyId) {
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.aadhaarNumber = aadhaarNumber;
        this.monthlyRent = monthlyRent;
        this.securityDeposit = securityDeposit;
        this.leaseStartDate = leaseStartDate;
        this.leaseEndDate = leaseEndDate;
        this.dueDate = dueDate;
        this.paymentStatus = paymentStatus;
        this.propertyId = propertyId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAadhaarNumber() {
        return aadhaarNumber;
    }

    public void setAadhaarNumber(String aadhaarNumber) {
        this.aadhaarNumber = aadhaarNumber;
    }

    public Double getMonthlyRent() {
        return monthlyRent;
    }

    public void setMonthlyRent(Double monthlyRent) {
        this.monthlyRent = monthlyRent;
    }

    public Double getSecurityDeposit() {
        return securityDeposit;
    }

    public void setSecurityDeposit(Double securityDeposit) {
        this.securityDeposit = securityDeposit;
    }

    public String getLeaseStartDate() {
        return leaseStartDate;
    }

    public void setLeaseStartDate(String leaseStartDate) {
        this.leaseStartDate = leaseStartDate;
    }

    public String getLeaseEndDate() {
        return leaseEndDate;
    }

    public void setLeaseEndDate(String leaseEndDate) {
        this.leaseEndDate = leaseEndDate;
    }

    public String getDueDate() {
        return dueDate;
    }

    public void setDueDate(String dueDate) {
        this.dueDate = dueDate;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public Long getPropertyId() {
        return propertyId;
    }

    public void setPropertyId(Long propertyId) {
        this.propertyId = propertyId;
    }
}