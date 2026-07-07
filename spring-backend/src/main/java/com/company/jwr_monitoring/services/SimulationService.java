package com.company.jwr_monitoring.services;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import com.company.jwr_monitoring.entity.TagMaster;
import com.company.jwr_monitoring.repository.TagLogRepository;
import com.company.jwr_monitoring.repository.TagMasterRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class SimulationService implements CommandLineRunner {

    private static final int BATCH_SIZE = 5000;

    private final TagMasterRepository tagMasterRepository;
    private final TagLogRepository tagLogRepository;
    private final JdbcTemplate jdbcTemplate;

    private final Random random = new Random();

    @Override
    public void run(String... args) {

        log.info("Simulation Service Started...");

        generateMonthLogs(2026, 6);
    }

    public void generateMonthLogs(int year, int month) {

        if (tagLogRepository.count() > 0) {
            log.info("Tag logs already exist. Skipping generation.");
            return;
        }

        List<TagMaster> tags = tagMasterRepository.findAll();

        if (tags.isEmpty()) {
            log.info("No TagMaster records found.");
            return;
        }

        YearMonth yearMonth = YearMonth.of(year, month);

        LocalDateTime current = yearMonth.atDay(1).atStartOfDay();
        LocalDateTime end = yearMonth.atEndOfMonth().atTime(23, 59);

        double temperature = 30.0;
        double rh = 60.0;
        double energy = 100.0;

        List<Object[]> batch = new ArrayList<>(BATCH_SIZE);

        long totalInserted = 0;

        long start = System.currentTimeMillis();

        while (!current.isAfter(end)) {

            temperature = simulateTemperature(temperature);
            rh = simulateRH(rh, temperature);
            energy = simulateEnergy(energy);

            Timestamp timestamp = Timestamp.valueOf(current);

            for (TagMaster tag : tags) {

                double value;

                switch (tag.getParameter().getId().intValue()) {

                    case 1:
                        value = temperature;
                        break;

                    case 2:
                        value = energy;
                        break;

                    case 3:
                        value = rh;
                        break;

                    default:
                        value = roundHalf(random.nextDouble() * 100);
                }

                batch.add(new Object[] {
                        tag.getId(),
                        value,
                        timestamp
                });

                if (batch.size() >= BATCH_SIZE) {

                    insertBatch(batch);

                    totalInserted += batch.size();

                    log.info("Inserted {} records...", totalInserted);

                    batch.clear();
                }
            }

            current = current.plusMinutes(1);
        }

        if (!batch.isEmpty()) {

            insertBatch(batch);

            totalInserted += batch.size();

            batch.clear();
        }

        long endTime = System.currentTimeMillis();

        log.info("---------------------------------------");
        log.info("Simulation Completed");
        log.info("Total Records : {}", totalInserted);
        log.info("Time Taken    : {} sec", (endTime - start) / 1000.0);
        log.info("---------------------------------------");
    }

    private void insertBatch(List<Object[]> batch) {

        jdbcTemplate.batchUpdate(
                """
                        INSERT INTO tag_logs(tag_id, value, timestamp)
                        VALUES (?, ?, ?)
                        """,
                batch);
    }

    private double simulateTemperature(double currentTemp) {

        double change = (random.nextDouble() - 0.5);

        double next = currentTemp + change;

        next = Math.max(28.0, Math.min(38.0, next));

        return roundHalf(next);
    }

    private double simulateRH(double currentRH, double temperature) {

        double change = (random.nextDouble() - 0.5); // -0.5 to +0.5

        double next = currentRH
                + change
                - ((temperature - 30) * 0.03);

        // Keep RH between 50% and 100%
        next = Math.max(50.0, Math.min(100.0, next));

        return roundHalf(next);
    }

    private double simulateEnergy(double currentEnergy) {

        double next = currentEnergy + (0.3 + random.nextDouble());

        return roundHalf(next);
    }

    private double roundHalf(double value) {

        return Math.round(value * 2.0) / 2.0;
    }
}