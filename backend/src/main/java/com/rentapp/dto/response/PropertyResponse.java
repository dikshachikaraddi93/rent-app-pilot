package com.rentapp.dto.response;

public class PropertyResponse {

    private Long id;
    private String propertyName;
    private String propertyType;
    private String address;
    private int totalUnits;
    private int occupiedUnits;
    private double monthlyRent;

    public PropertyResponse() {
    }

    public PropertyResponse(Long id, String propertyName,
                            String propertyType, String address,
                            int totalUnits, int occupiedUnits,
                            double monthlyRent) {
        this.id = id;
        this.propertyName = propertyName;
        this.propertyType = propertyType;
        this.address = address;
        this.totalUnits = totalUnits;
        this.occupiedUnits = occupiedUnits;
        this.monthlyRent = monthlyRent;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public int getTotalUnits() {
        return totalUnits;
    }

    public void setTotalUnits(int totalUnits) {
        this.totalUnits = totalUnits;
    }

    public int getOccupiedUnits() {
        return occupiedUnits;
    }

    public void setOccupiedUnits(int occupiedUnits) {
        this.occupiedUnits = occupiedUnits;
    }

    public double getMonthlyRent() {
        return monthlyRent;
    }

    public void setMonthlyRent(double monthlyRent) {
        this.monthlyRent = monthlyRent;
    }
}