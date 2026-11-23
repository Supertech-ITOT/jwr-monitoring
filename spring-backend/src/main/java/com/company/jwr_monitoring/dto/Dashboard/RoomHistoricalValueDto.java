package com.company.jwr_monitoring.dto.Dashboard;

import java.time.LocalDateTime;
import lombok.Builder;

@Builder
public record RoomHistoricalValueDto(
        Double avgTemperature,
        Double rh,
        LocalDateTime timestamp) {
}