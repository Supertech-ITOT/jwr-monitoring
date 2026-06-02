package com.company.jwr_monitoring.services.Impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.company.jwr_monitoring.dto.RoomDashboardDto;
import com.company.jwr_monitoring.dto.RoomDashboardRequest;
import com.company.jwr_monitoring.repository.TagLogRepository;
import com.company.jwr_monitoring.services.RoomDashboardService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoomDashboardServiceImpl implements RoomDashboardService {

    private final TagLogRepository tagLogRepository;

    @Override
    public Page<RoomDashboardDto> getRoomDashboard(
            RoomDashboardRequest request,
            Pageable pageable) {

        return tagLogRepository.getRoomDashboard(
                request.categoryId(),
                request.roomId(),
                request.fromDate(),
                request.toDate(),
                pageable);
    }
}