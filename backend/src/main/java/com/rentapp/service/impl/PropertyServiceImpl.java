package com.rentapp.service.impl;

import com.rentapp.dto.request.PropertyRequest;
import com.rentapp.dto.response.PropertyResponse;
import com.rentapp.entity.Property;
import com.rentapp.exception.ResourceNotFoundException;
import com.rentapp.repository.PropertyRepository;
import com.rentapp.service.PropertyService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PropertyServiceImpl implements PropertyService {

    private final PropertyRepository propertyRepository;

    public PropertyServiceImpl(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    @Override
    public PropertyResponse createProperty(PropertyRequest request) {

        Property property = new Property();

        property.setPropertyName(request.getPropertyName());
        property.setPropertyType(request.getPropertyType());
        property.setAddress(request.getAddress());
        property.setTotalUnits(request.getTotalUnits());
        property.setOccupiedUnits(request.getOccupiedUnits());
        property.setMonthlyRent(request.getMonthlyRent());

        Property savedProperty = propertyRepository.save(property);

        return mapToResponse(savedProperty);
    }

    @Override
    public List<PropertyResponse> getAllProperties() {

        return propertyRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public PropertyResponse getPropertyById(Long id) {

        Property property = propertyRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Property not found with id: " + id));

        return mapToResponse(property);
    }

    @Override
    public PropertyResponse updateProperty(Long id, PropertyRequest request) {

        Property property = propertyRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Property not found with id: " + id));

        property.setPropertyName(request.getPropertyName());
        property.setPropertyType(request.getPropertyType());
        property.setAddress(request.getAddress());
        property.setTotalUnits(request.getTotalUnits());
        property.setOccupiedUnits(request.getOccupiedUnits());
        property.setMonthlyRent(request.getMonthlyRent());

        Property updatedProperty = propertyRepository.save(property);

        return mapToResponse(updatedProperty);
    }

    @Override
    public void deleteProperty(Long id) {

        if (!propertyRepository.existsById(id)) {
            throw new ResourceNotFoundException("Property not found with id: " + id);
        }

        propertyRepository.deleteById(id);
    }

    @Override
    public List<PropertyResponse> searchProperties(String keyword) {

        return propertyRepository
                .findByPropertyNameContainingIgnoreCase(keyword)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public Page<PropertyResponse> getProperties(int page, int size) {

        Page<Property> propertyPage =
                propertyRepository.findAll(PageRequest.of(page, size));

        List<PropertyResponse> responseList = propertyPage
                .getContent()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());

        return new PageImpl<>(
                responseList,
                propertyPage.getPageable(),
                propertyPage.getTotalElements()
        );
    }

    private PropertyResponse mapToResponse(Property property) {

        PropertyResponse response = new PropertyResponse();

        response.setId(property.getId());
        response.setPropertyName(property.getPropertyName());
        response.setPropertyType(property.getPropertyType());
        response.setAddress(property.getAddress());
        response.setTotalUnits(property.getTotalUnits());
        response.setOccupiedUnits(property.getOccupiedUnits());
        response.setMonthlyRent(property.getMonthlyRent());

        return response;
    }
}