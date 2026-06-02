
package com.company.jwr_monitoring.dto;

import java.time.LocalDateTime;

public record RoomDashboardDto(
        Double avgTemperature,
        Double rh,
        Double energy,
        LocalDateTime timestamp) {
}