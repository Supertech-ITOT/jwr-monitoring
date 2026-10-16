package com.company.jwr_monitoring.dto.Energy;

import com.company.jwr_monitoring.enums.RoomType;

public record RoomEnergyDto(
        Long roomId,
        String roomName,
        RoomType roomType,
        Double componentA,
        Double componentB,
        Double componentC,
        Double totalEnergy) {

}
