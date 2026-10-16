package com.company.jwr_monitoring.calculation;

import java.util.Map;

import org.springframework.stereotype.Component;

@Component
public class EnergyCalculator {

    private double get(Map<String, Double> tags, String name) {
        return tags.getOrDefault(name, 0.0);
    }

    private double sum(Map<String, Double> tags, String... names) {
        double total = 0.0;

        for (String name : names) {
            total += get(tags, name);
        }

        return total;
    }

    public double calculateComponentA(
            Map<String, Double> tags,
            String roomTag) {

        return get(tags, roomTag);
    }

    public double calculatePositiveComponentB(
            Map<String, Double> tags,
            long runningRooms) {

        if (runningRooms == 0)
            return 0.0;

        double x = sum(tags,
                "COM1_P_KWH",
                "COM2_P_KWH",
                "COM3_P_KWH",
                "COM4_P_KWH");

        double y = sum(tags, "EV1_KWH", "EV2_KWH");
        double z = get(tags, "LP_P_KWH");

        return (x + y + z) / runningRooms;
    }

    public double calculateNegativeComponentB(
            Map<String, Double> tags,
            long runningRooms) {

        if (runningRooms == 0)
            return 0.0;

        double x = sum(tags,
                "COM1_N_KWH",
                "COM2_N_KWH",
                "COM3_N_KWH",
                "COM4_N_KWH");

        double y = sum(tags, "EV3_KWH", "EV4_KWH");
        double z = get(tags, "LP_N_KWH");

        return (x + y + z) / runningRooms;
    }

    public double calculateComponentC(
            Map<String, Double> tags,
            long totalRunningRooms) {

        if (totalRunningRooms == 0)
            return 0.0;

        double commonEnergy = sum(tags,
                "AR1A_KWH",
                "AR1B_KWH",
                "AR2A_KWH",
                "AR2B_KWH",
                "AR3_KWH",
                "TD1A_KWH",
                "TD1B_KWH",
                "TD1C_KWH",
                "TD1D_KWH",
                "TD2A_KWH",
                "TD2B_KWH",
                "MEZ1A_KWH",
                "MEZ1B_KWH",
                "MEZ1C_KWH",
                "MEZ1D_KWH",
                "CHW1_KWH",
                "CHW2_KWH",
                "LIG_KWH");

        return commonEnergy / totalRunningRooms;
    }

    public double calculateTotal(double a, double b, double c) {
        return a + b + c;
    }

}
