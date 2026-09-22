package com.company.jwr_monitoring.dto.Dashboard;

import java.time.LocalDateTime;

public record EnergyRoomLogFlatResponse(
        Long roomId,
        String roomName,
        LocalDateTime timeStamp,

        Double energy,
        Double current,
        Double voltage,
        Double frequency,

        Double avgEnergy,
        Double minEnergy,
        Double maxEnergy,

        Double avgCurrent,
        Double minCurrent,
        Double maxCurrent,

        Double avgVoltage,
        Double minVoltage,
        Double maxVoltage,

        Double avgFrequency,
        Double minFrequency,
        Double maxFrequency) {

}
