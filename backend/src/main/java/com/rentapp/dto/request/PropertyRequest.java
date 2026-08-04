package com.rentapp.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class PropertyRequest {

    @NotBlank(message = "Property name is required")
    private String propertyName;

    @NotBlank(message = "Property type is required")
    private String propertyType;

    @NotBlank(message = "Address is required")
    private String address;

    @NotNull(message = "Total units is required")
    @Min(value = 1, message = "Total units must be at least 1")
    private Integer totalUnits;

    @NotNull(message = "Occupied units is required")
    @Min(value = 0, message = "Occupied units cannot be negative")
    private Integer occupiedUnits;

    @NotNull(message = "Monthly rent is required")
    @Min(value = 1, message = "Monthly rent must be greater than 0")
    private Double monthlyRent;

    public PropertyRequest() {
    }

    public PropertyRequest(String propertyName, String propertyType,
                           String address, Integer totalUnits,
                           Integer occupiedUnits, Double monthlyRent) {
        this.propertyName = propertyName;
        this.propertyType = propertyType;
        this.address = address;
        this.totalUnits = totalUnits;
        this.occupiedUnits = occupiedUnits;
        this.monthlyRent = monthlyRent;
    }

    public String getPropertyName() {
        return propertyName;
    }

    public void setPropertyName(String propertyName) {
        this.propertyName = propertyName;
    }

    public String getPropertyType() {
        return propertyType;
    }

    public void setPropertyType(String propertyType) {
        this.propertyType = propertyType;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getTotalUnits() {
        return totalUnits;
    }

    public void setTotalUnits(Integer totalUnits) {
        this.totalUnits = totalUnits;
    }

    public Integer getOccupiedUnits() {
        return occupiedUnits;
    }

    public void setOccupiedUnits(Integer occupiedUnits) {
        this.occupiedUnits = occupiedUnits;
    }

    public Double getMonthlyRent() {
        return monthlyRent;
    }

    public void setMonthlyRent(Double monthlyRent) {
        this.monthlyRent = monthlyRent;
    }
}