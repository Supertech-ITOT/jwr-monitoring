package com.company.jwr_monitoring.controller;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.company.jwr_monitoring.dto.Common.ApiResponse;
import com.company.jwr_monitoring.dto.Dashboard.CommonRoomRequest;
import com.company.jwr_monitoring.dto.Dashboard.CommonRoomResponse;
import com.company.jwr_monitoring.dto.Dashboard.EnergyRoomRequest;
import com.company.jwr_monitoring.dto.Dashboard.EnergyRoomResponse;
import com.company.jwr_monitoring.dto.Dashboard.RoomCurrentValueDto;
import com.company.jwr_monitoring.dto.Dashboard.RoomHistoricalValueDto;
import com.company.jwr_monitoring.dto.Dashboard.RoomHistoricalValueRequest;
import com.company.jwr_monitoring.dto.Dashboard.RoomStatCardDto;
import com.company.jwr_monitoring.services.DashboardService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@CrossOrigin("*")
public class DashboardController {

        private final DashboardService roomDashboardService;

        // Historical Room Metrics
        @GetMapping
        public ResponseEntity<ApiResponse<Page<RoomHistoricalValueDto>>> getHistoricalRoomMetrics(
                        @Valid @ModelAttribute RoomHistoricalValueRequest request, Pageable pageable) {
                Page<RoomHistoricalValueDto> response = roomDashboardService.getHistoricalRoomMetrics(request,
                                pageable);
                return ResponseEntity.ok(ApiResponse.success("Historical Room Metrics fetched successfully", response));
        }

        // Current Room Metrics
        @GetMapping("/current-metrics/{categoryId}")
        public ResponseEntity<ApiResponse<List<RoomCurrentValueDto>>> getCurrentRoomMetrics(
                        @PathVariable Long categoryId) {
                List<RoomCurrentValueDto> response = roomDashboardService.getCurrentRoomMetricsByCategory(categoryId);
                return ResponseEntity.ok(
                                ApiResponse.success("Current Room Metrics By Category fetched successfully", response));
        }

        // Room Statistics
        @GetMapping("/room-stat")
        public ResponseEntity<ApiResponse<List<RoomStatCardDto>>> getRoomStatCard() {
                List<RoomStatCardDto> response = roomDashboardService.getRoomStatCard();
                return ResponseEntity.ok(ApiResponse.success("Room Stat fetched successfully", response));
        }

        // Common Room Logs
        @PostMapping("/common-logs")
        public ResponseEntity<ApiResponse<Page<CommonRoomResponse>>> getCommonRoomLog(
                        @RequestBody CommonRoomRequest request,
                        Pageable pageable) {
                Page<CommonRoomResponse> response = roomDashboardService.getCommonRoomLog(request, pageable);
                return ResponseEntity.ok(ApiResponse.success("Common Room Log fetched successfully", response));
        }

        // Energy Room Logs
        @PostMapping("/energy-logs")
        public ResponseEntity<ApiResponse<Page<EnergyRoomResponse>>> getEnergyRoomLog(
                        @RequestBody EnergyRoomRequest request,
                        Pageable pageable) {
                Page<EnergyRoomResponse> response = roomDashboardService.getEnergyRoomLog(request, pageable);
                return ResponseEntity.ok(ApiResponse.success("energy Room Log fetched successfully", response));
        }
}
