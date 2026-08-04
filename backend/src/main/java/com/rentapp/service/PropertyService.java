package com.rentapp.service;

import com.rentapp.dto.request.PropertyRequest;
import com.rentapp.dto.response.PropertyResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface PropertyService {

    PropertyResponse createProperty(PropertyRequest request);

    List<PropertyResponse> getAllProperties();

    PropertyResponse getPropertyById(Long id);

    PropertyResponse updateProperty(Long id, PropertyRequest request);

    void deleteProperty(Long id);

    List<PropertyResponse> searchProperties(String keyword);

    Page<PropertyResponse> getProperties(int page, int size);
}