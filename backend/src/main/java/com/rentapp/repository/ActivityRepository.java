package com.rentapp.repository;

import com.rentapp.entity.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Long> {

    List<Activity> findTop5ByOrderByTimeDesc();

}