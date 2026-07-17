
package com.company.jwr_monitoring.dto.Dashboard;

import java.time.LocalDateTime;

public record RoomHistoricalValueDto(
                Double avgTemperature,
                Double rh,
                LocalDateTime timestamp) {
}