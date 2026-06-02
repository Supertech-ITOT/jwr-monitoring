package com.company.jwr_monitoring.dto;

import java.time.LocalDateTime;

public record RoomDashboardRequest(
        Long categoryId,
        Long roomId,
        LocalDateTime fromDate,
        LocalDateTime toDate) {

}
