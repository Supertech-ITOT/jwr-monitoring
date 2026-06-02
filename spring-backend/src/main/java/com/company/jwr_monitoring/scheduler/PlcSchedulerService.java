package com.company.jwr_monitoring.scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import com.company.jwr_monitoring.services.TagLoggingService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PlcSchedulerService {

    private final TagLoggingService tagLoggingService;

    @Scheduled(fixedRate = 60000)
    public void executeLogging() {

        tagLoggingService.logAllTags();
    }
}