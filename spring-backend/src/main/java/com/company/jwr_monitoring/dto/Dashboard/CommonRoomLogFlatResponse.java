package com.company.jwr_monitoring.dto.Dashboard;

import java.time.LocalDateTime;

public record CommonRoomLogFlatResponse(
        Long roomId,
        String roomName,
        LocalDateTime timeStamp,

        // Interval values displayed in table
        Double avgTemp,
        Double rh,

        // Temperature AVG / MIN / MAX
        Double avgTemperature,
        Double minTemperature,
        Double maxTemperature,

        // RH AVG / MIN / MAX
        Double avgRh,
        Double minRh,
        Double maxRh) {

}
