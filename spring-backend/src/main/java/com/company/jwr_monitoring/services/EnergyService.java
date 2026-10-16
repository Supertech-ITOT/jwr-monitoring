package com.company.jwr_monitoring.services;

import com.company.jwr_monitoring.dto.Energy.EnergyConsumptionRequestDto;
import com.company.jwr_monitoring.dto.Energy.EnergyConsumptionResponseDto;

public interface EnergyService {
    EnergyConsumptionResponseDto getEnergyConsumptionData(EnergyConsumptionRequestDto request);

}
