package com.company.jwr_monitoring.services;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.company.jwr_monitoring.entity.TagLog;
import com.company.jwr_monitoring.entity.TagMaster;
import com.company.jwr_monitoring.repository.TagLogRepository;
import com.company.jwr_monitoring.repository.TagMasterRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class SimulationService implements CommandLineRunner {

    private final TagMasterRepository tagMasterRepository;
    private final TagLogRepository tagLogRepository;

    private final Random random = new Random();

    @Override
    public void run(String... args) {

        // Change this month/year as needed
        // int year = 2026;
        // int month = 6;

        // generateMonthLogs(year, month);
    }

    public void generateMonthLogs(int year, int month) {

        // Optional: skip if already exists
        if (tagLogRepository.count() > 0) {
            System.out.println("Tag logs already exist. Skipping initializer.");
            return;
        }

        List<TagMaster> tags = tagMasterRepository.findAll();

        if (tags.isEmpty()) {
            System.out.println("No TagMaster found.");
            return;
        }

        YearMonth yearMonth = YearMonth.of(year, month);

        LocalDateTime current = yearMonth.atDay(1).atStartOfDay();

        LocalDateTime end = yearMonth.atEndOfMonth().atTime(23, 55);

        List<TagLog> logs = new ArrayList<>();

        // Base values (to create smooth transitions)
        double temperature = 30.0;
        double rh = 60.0;
        double energy = 100.0;

        while (!current.isAfter(end)) {

            // Smooth realistic movement
            temperature = simulateTemperature(temperature);
            rh = simulateRH(rh, temperature);
            energy = simulateEnergy(energy);

            for (TagMaster tag : tags) {

                Long parameterId = tag.getParameter().getId();

                double value = switch (parameterId.intValue()) {

                    // Temperature
                    case 1 -> temperature;

                    // RH
                    case 2 -> rh;

                    // Energy
                    case 3 -> energy;

                    default -> roundHalf(random.nextDouble() * 100);
                };

                logs.add(
                        TagLog.builder()
                                .tag(tag)
                                .value(value)
                                .timestamp(current)
                                .build());
            }

            // 5 min interval
            current = current.plusMinutes(5);
        }

        tagLogRepository.saveAll(logs);

        System.out.println(
                "[INITIALIZER] Inserted "
                        + logs.size()
                        + " tag logs");
    }

    private double simulateTemperature(double currentTemp) {

        // small realistic fluctuation
        double change = (random.nextDouble() - 0.5);

        double next = currentTemp + change;

        // keep inside realistic range
        next = Math.max(28.0, Math.min(38.0, next));

        return roundHalf(next);
    }

    private double simulateRH(double currentRH,
            double temperature) {

        // RH tends to slightly decrease as temp rises
        double change = (random.nextDouble() - 0.5);

        double next = currentRH
                + change
                - ((temperature - 30) * 0.03);

        next = Math.max(45.0, Math.min(75.0, next));

        return roundHalf(next);
    }

    private double simulateEnergy(double currentEnergy) {

        // gradual increase like consumption
        double next = currentEnergy + (0.3 + random.nextDouble());

        return roundHalf(next);
    }

    private double roundHalf(double value) {

        // rounds to nearest 0.5
        return Math.round(value * 2.0) / 2.0;
    }
}