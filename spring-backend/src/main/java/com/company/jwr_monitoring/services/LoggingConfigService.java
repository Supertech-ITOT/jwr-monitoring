package com.company.jwr_monitoring.services;

import org.springframework.stereotype.Service;

import com.company.jwr_monitoring.entity.LoggingConfig;
import com.company.jwr_monitoring.repository.LoggingConfigRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoggingConfigService {

    private final LoggingConfigRepository repository;

    public Integer getIntervalMinutes() {

        return repository.findById(1L)
                .map(LoggingConfig::getLoggingIntervalMinutes)
                .orElse(5);
    }

    public LoggingConfig saveInterval(Integer interval) {

        LoggingConfig config = repository.findById(1L)
                .orElse(new LoggingConfig());

        config.setId(1L);
        config.setLoggingIntervalMinutes(interval);

        return repository.save(config);
    }
}