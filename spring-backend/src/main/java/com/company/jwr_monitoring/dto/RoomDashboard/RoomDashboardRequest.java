package com.company.jwr_monitoring.dto.RoomDashboard;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotNull;

public record RoomDashboardRequest(

                @NotNull(message = "Category ID is required") Long categoryId,

                @NotNull(message = "Room ID is required") Long roomId,

                @NotNull(message = "From date is required") LocalDateTime fromDate,

                @NotNull(message = "To date is required") LocalDateTime toDate

) {
}