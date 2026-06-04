package com.company.jwr_monitoring.dto.Dashboard;

import java.time.LocalDateTime;

public record RoomCurrentValueDto(
        Long roomId,
        String roomName,
        Double avgTemperature,
        Double rh,
        Double energy,
        LocalDateTime timestamp) {
}