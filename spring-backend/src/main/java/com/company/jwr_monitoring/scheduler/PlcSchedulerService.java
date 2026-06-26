package com.company.jwr_monitoring.scheduler;

import java.time.Duration;
import java.time.LocalDateTime;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.company.jwr_monitoring.entity.LoggingConfig;
import com.company.jwr_monitoring.services.LoggingConfigService;
import com.company.jwr_monitoring.services.TagLoggingService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PlcSchedulerService {

    private final TagLoggingService tagLoggingService;
    private final LoggingConfigService loggingConfigService;

    @Scheduled(cron = "0 * * * * *")
    public void executeLogging() {

        LoggingConfig config = loggingConfigService.getConfig();

        LocalDateTime now = LocalDateTime.now()
                .withSecond(0)
                .withNano(0);

        long minutesElapsed = Duration.between(config.getLastExecutionTime(), now).toMinutes();

        if (minutesElapsed >= config.getLoggingIntervalMinutes()) {

            tagLoggingService.logAllTags();

            config.setLastExecutionTime(now);
            loggingConfigService.save(config);
        }
    }
}