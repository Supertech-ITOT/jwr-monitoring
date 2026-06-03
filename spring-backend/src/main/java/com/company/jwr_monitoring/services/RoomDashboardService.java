package com.company.jwr_monitoring.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.company.jwr_monitoring.dto.RoomDashboard.RoomDashboardDto;
import com.company.jwr_monitoring.dto.RoomDashboard.RoomDashboardRequest;

public interface RoomDashboardService {
    Page<RoomDashboardDto> getRoomDashboard(RoomDashboardRequest request, Pageable pageable);
}