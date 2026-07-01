package com.company.jwr_monitoring.services.Impl;

import java.lang.reflect.Parameter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.company.jwr_monitoring.dto.Dashboard.RoomCurrentValueDto;
import com.company.jwr_monitoring.dto.Dashboard.RoomHistoricalValueDto;
import com.company.jwr_monitoring.dto.Dashboard.RoomHistoricalValueRequest;
import com.company.jwr_monitoring.dto.Dashboard.RoomStatCardDto;
import com.company.jwr_monitoring.repository.CategoryRepository;
import com.company.jwr_monitoring.repository.RoomRepository;
import com.company.jwr_monitoring.repository.TagCurrentValueRepository;
import com.company.jwr_monitoring.repository.TagLogRepository;
import com.company.jwr_monitoring.services.DashboardService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final TagLogRepository tagLogRepository;
    private final TagCurrentValueRepository tagCurrentValueRepository;
    private final CategoryRepository categoryRepository;
    private final RoomRepository roomRepository;

    @Override
    public Page<RoomHistoricalValueDto> getHistoricalRoomMetrics(RoomHistoricalValueRequest request,
            Pageable pageable) {
        Pageable finalPageable = pageable.getPageSize() == 20
                && pageable.getPageNumber() == 0
                        ? Pageable.unpaged()
                        : pageable;

        Page<RoomHistoricalValueDto> roomHistoricalValueDto = tagLogRepository.getHistoricalRoomMetrics(
                request.categoryId(),
                request.roomId(), request.fromDate(), request.toDate(), finalPageable);
        return roomHistoricalValueDto;
    }

    @Override
    public List<RoomCurrentValueDto> getCurrentRoomMetricsByCategory(Long categoryId, Long parameterId) {
        return tagCurrentValueRepository.getCurrentRoomMetricsByCategoryAndParameter(categoryId, parameterId);
    }

    @Override
    public List<RoomStatCardDto> getRoomStatCard() {
        List<RoomStatCardDto> response = new ArrayList<>();
        response.add(new RoomStatCardDto(0L, "Total Rooms", roomRepository.count()));
        response.addAll(categoryRepository.getRoomStatCard());
        return response;
    }
}