package com.company.jwr_monitoring.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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
        EnergyConsumptionResponseDto res = energyService.getEnergyConsumptionData(request);
        return ResponseEntity.ok(ApiResponse.success("consumption fetched successfully", res));
    }

}
