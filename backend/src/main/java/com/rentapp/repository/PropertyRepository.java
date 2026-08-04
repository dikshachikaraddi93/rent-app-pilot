package com.rentapp.repository;

import com.rentapp.entity.Property;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, Long> {

    List<Property> findByPropertyNameContainingIgnoreCase(String keyword);

}