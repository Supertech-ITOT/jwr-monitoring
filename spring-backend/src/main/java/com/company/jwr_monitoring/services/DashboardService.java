package com.company.jwr_monitoring.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.company.jwr_monitoring.dto.Dashboard.RoomCurrentValueDto;
import com.company.jwr_monitoring.dto.Dashboard.RoomHistoricalValueDto;
import com.company.jwr_monitoring.dto.Dashboard.RoomHistoricalValueRequest;
import com.company.jwr_monitoring.dto.Dashboard.RoomStatCardDto;

public interface DashboardService {
    Page<RoomHistoricalValueDto> getHistoricalRoomMetrics(RoomHistoricalValueRequest request, Pageable pageable);

    List<RoomCurrentValueDto> getCurrentRoomMetricsByCategory(Long categoryId);

    List<RoomStatCardDto> getRoomStatCard();
}