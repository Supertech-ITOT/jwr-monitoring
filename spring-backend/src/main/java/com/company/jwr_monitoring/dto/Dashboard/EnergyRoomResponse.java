package com.company.jwr_monitoring.dto.Dashboard;

import java.util.List;

public record EnergyRoomResponse(
                Long roomId,
                String roomName,
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
