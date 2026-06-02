package com.company.jwr_monitoring.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.company.jwr_monitoring.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}