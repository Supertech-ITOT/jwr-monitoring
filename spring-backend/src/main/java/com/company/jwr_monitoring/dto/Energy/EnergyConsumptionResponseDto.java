package com.company.jwr_monitoring.dto.Energy;

import java.util.List;

public record EnergyConsumptionResponseDto(
                List<RoomEnergyDto> rooms,
                Double componentATotal,
                Double componentBTotal,
                Double componentCTotal,
                Double totalEnergy) {

}
