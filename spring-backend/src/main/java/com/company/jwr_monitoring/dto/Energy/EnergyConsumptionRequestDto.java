package com.company.jwr_monitoring.dto.Energy;

import java.time.LocalDateTime;
import java.util.List;
import com.company.jwr_monitoring.enums.RoomType;

public record EnergyConsumptionRequestDto(
        List<Long> roomIds,
        RoomType roomType,
        LocalDateTime fromDate,
        LocalDateTime toDate) {

}
