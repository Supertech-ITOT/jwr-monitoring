package com.company.jwr_monitoring.dto.Dashboard;

import java.util.List;

public record EnergyRoomResponse(
        Long roomId,
        String roomName,
        Long categoryId,
        List<EnergyRoomLogResponse> logs,

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
        Double maxFrequency

) {

}
