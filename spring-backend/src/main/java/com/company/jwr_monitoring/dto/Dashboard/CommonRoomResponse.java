package com.company.jwr_monitoring.dto.Dashboard;

import java.util.List;

public record CommonRoomResponse(
                Long roomId,
                String roomName,
                List<CommonRoomLogResponse> logs,

                // Temperature
                Double avgTemperature,
                Double minTemperature,
                Double maxTemperature,

                // RH
                Double avgRh,
                Double minRh,
                Double maxRh) {

}
