package com.company.jwr_monitoring.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.company.jwr_monitoring.entity.LoggingConfig;

public interface LoggingConfigRepository
        extends JpaRepository<LoggingConfig, Long> {

}