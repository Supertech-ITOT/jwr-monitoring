package com.company.jwr_monitoring.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.company.jwr_monitoring.entity.TagLog;
import com.company.jwr_monitoring.entity.TagMaster;
import com.company.jwr_monitoring.repository.TagLogRepository;
import com.company.jwr_monitoring.repository.TagMasterRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SimulationService {

    private final TagMasterRepository tagMasterRepository;
    private final TagLogRepository tagLogRepository;

    private final Random random = new Random();

    @Scheduled(fixedRate = 5000) // every 5 sec
    public void generateLogs() {

        List<TagMaster> tags = tagMasterRepository.findAll();

        if (tags.isEmpty()) {
            return;
        }

        List<TagLog> logs = tags.stream()
                .map(this::createFakeLog)
                .toList();

        tagLogRepository.saveAll(logs);

        System.out.println(
                "[SIMULATION] Generated " + logs.size() + " logs");
    }

    private TagLog createFakeLog(TagMaster tag) {

        Long parameterId = tag.getParameter().getId();

        double value = switch (parameterId.intValue()) {

            // Temperature
            case 1 -> 25 + random.nextDouble() * 15;

            // RH
            case 2 -> 45 + random.nextDouble() * 35;

            // Energy
            case 3 -> 100 + random.nextDouble() * 300;

            default -> random.nextDouble() * 100;
        };

        return TagLog.builder()
                .tag(tag)
                .value(Math.round(value * 100.0) / 100.0)
                .timestamp(LocalDateTime.now())
                .build();
    }
}