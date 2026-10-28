package com.company.jwr_monitoring.dto.Energy;

public record RoomEnergyDto(
                Long roomId,
                String roomName,
                Double componentA,
                Double componentB,
                Double componentC,
                Double totalEnergy) {

}
