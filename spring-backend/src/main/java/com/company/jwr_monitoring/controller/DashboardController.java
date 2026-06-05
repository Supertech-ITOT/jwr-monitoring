package com.company.jwr_monitoring.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.company.jwr_monitoring.dto.Common.ApiResponse;
import com.company.jwr_monitoring.dto.Dashboard.RoomCurrentValueDto;
import com.company.jwr_monitoring.dto.Dashboard.RoomHistoricalValueDto;
import com.company.jwr_monitoring.dto.Dashboard.RoomHistoricalValueRequest;
import com.company.jwr_monitoring.dto.Dashboard.RoomStatCardDto;
import com.company.jwr_monitoring.services.DashboardService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin("*")
@RequiredArgsConstructor
public class DashboardController {

        private final DashboardService roomDashboardService;

        @GetMapping
        public ResponseEntity<ApiResponse<Page<RoomHistoricalValueDto>>> getHistoricalRoomMetrics(
                        @Valid @ModelAttribute RoomHistoricalValueRequest request, Pageable pageable) {
                Page<RoomHistoricalValueDto> response = roomDashboardService.getHistoricalRoomMetrics(request,
                                pageable);
                return ResponseEntity.ok(ApiResponse.success("Historical Room Metrics fetched successfully", response));
        }

        @GetMapping("/current-metrics")
        public ResponseEntity<ApiResponse<List<RoomCurrentValueDto>>> getCurrentRoomMetricsByCategory(
                        @RequestParam Long categoryId) {
                List<RoomCurrentValueDto> response = roomDashboardService.getCurrentRoomMetricsByCategory(categoryId);
                return ResponseEntity.ok(
                                ApiResponse.success("Current Room Metrics By Category fetched successfully", response));
        }

        @GetMapping("/room-stat")
        public ResponseEntity<ApiResponse<List<RoomStatCardDto>>> getRoomStatCard() {
                List<RoomStatCardDto> response = roomDashboardService.getRoomStatCard();
                return ResponseEntity.ok(
                                ApiResponse.success("Room Stat fetched successfully", response));
        }

}