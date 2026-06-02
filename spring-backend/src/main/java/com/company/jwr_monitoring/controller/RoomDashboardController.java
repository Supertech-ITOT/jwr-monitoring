package com.company.jwr_monitoring.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.company.jwr_monitoring.dto.ApiResponse;
import com.company.jwr_monitoring.dto.RoomDashboardDto;
import com.company.jwr_monitoring.dto.RoomDashboardRequest;
import com.company.jwr_monitoring.services.RoomDashboardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin("*")
@RequiredArgsConstructor
public class RoomDashboardController {

        private final RoomDashboardService roomDashboardService;

        @GetMapping
        public ResponseEntity<ApiResponse<Page<RoomDashboardDto>>> getRoomDashboard(
                        @ModelAttribute RoomDashboardRequest request,
                        Pageable pageable) {

                Page<RoomDashboardDto> response = roomDashboardService.getRoomDashboard(
                                request,
                                pageable);

                return ResponseEntity.ok(
                                ApiResponse.success(
                                                "Room dashboard fetched successfully",
                                                response));
        }
}