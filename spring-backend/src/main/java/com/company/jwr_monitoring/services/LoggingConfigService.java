package com.company.jwr_monitoring.services;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.company.jwr_monitoring.entity.LoggingConfig;
import com.company.jwr_monitoring.repository.LoggingConfigRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoggingConfigService {

    private final LoggingConfigRepository repository;

    public LoggingConfig getConfig() {
        return repository.findById(1L)
                .orElseGet(() -> {
                    LoggingConfig config = new LoggingConfig();
                    config.setId(1L);
                    config.setLoggingIntervalMinutes(5);
                    config.setLastExecutionTime(LocalDateTime.now());
                    return repository.save(config);
                });
    }

    public Integer getIntervalMinutes() {
        return getConfig().getLoggingIntervalMinutes();
    }

    public LoggingConfig saveInterval(Integer interval) {
        LoggingConfig config = getConfig();
        config.setLoggingIntervalMinutes(interval);
        return repository.save(config);
    }

    public LoggingConfig save(LoggingConfig config) {
        return repository.save(config);
    }
}