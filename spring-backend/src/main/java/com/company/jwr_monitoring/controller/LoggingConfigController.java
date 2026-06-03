package com.company.jwr_monitoring.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.company.jwr_monitoring.dto.Common.ApiResponse;
import com.company.jwr_monitoring.dto.LoggingConfig.LoggingConfigDto;
import com.company.jwr_monitoring.entity.LoggingConfig;
import com.company.jwr_monitoring.services.LoggingConfigService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/logging-config")
@RequiredArgsConstructor
@CrossOrigin("*")
public class LoggingConfigController {

    private final LoggingConfigService service;

    @GetMapping
    public ResponseEntity<ApiResponse<Integer>> getInterval() {

        return ResponseEntity.ok(
                ApiResponse.success("Interval fetched", service.getIntervalMinutes()));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<LoggingConfig>> updateInterval(
            @RequestBody LoggingConfigDto dto) {

        return ResponseEntity.ok(
                ApiResponse.success("Interval updated", service.saveInterval(dto.loggingIntervalMinutes())));
    }
}