package com.company.jwr_monitoring.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.company.jwr_monitoring.entity.Parameter;

public interface ParameterRepository extends JpaRepository<Parameter, Long> {

}