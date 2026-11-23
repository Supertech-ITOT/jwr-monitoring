
package com.company.jwr_monitoring.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.company.jwr_monitoring.dto.Common.ApiResponse;
import com.company.jwr_monitoring.dto.Energy.EnergyConsumptionRequestDto;
import com.company.jwr_monitoring.dto.Energy.EnergyConsumptionResponseDto;
import com.company.jwr_monitoring.services.EnergyService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/energy")
@RequiredArgsConstructor
public class EnergyController {

    private final EnergyService energyService;

    @PostMapping("/consumption")
    public ResponseEntity<ApiResponse<EnergyConsumptionResponseDto>> getEnergyConsumptionData(
            @RequestBody EnergyConsumptionRequestDto request) {
        EnergyConsumptionResponseDto response = energyService.getEnergyConsumptionData(request);
        return ResponseEntity.ok(ApiResponse.success("consumption fetched successfully", response));
    }
}
