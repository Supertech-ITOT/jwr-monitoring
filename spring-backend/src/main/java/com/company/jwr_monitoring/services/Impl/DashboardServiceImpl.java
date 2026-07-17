package com.company.jwr_monitoring.services.Impl;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.company.jwr_monitoring.dto.Dashboard.CommonRoomLogFlatResponse;
import com.company.jwr_monitoring.dto.Dashboard.CommonRoomLogResponse;
import com.company.jwr_monitoring.dto.Dashboard.CommonRoomRequest;
import com.company.jwr_monitoring.dto.Dashboard.CommonRoomResponse;
import com.company.jwr_monitoring.dto.Dashboard.RoomCurrentValueDto;
import com.company.jwr_monitoring.dto.Dashboard.RoomHistoricalValueDto;
import com.company.jwr_monitoring.dto.Dashboard.RoomHistoricalValueRequest;
import com.company.jwr_monitoring.dto.Dashboard.RoomStatCardDto;
import com.company.jwr_monitoring.entity.Room;
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
        public Page<RoomHistoricalValueDto> getHistoricalRoomMetrics(
                        RoomHistoricalValueRequest request,
                        Pageable pageable) {

                Pageable finalPageable = pageable.getPageSize() == 20
                                && pageable.getPageNumber() == 0
                                                ? Pageable.unpaged()
                                                : pageable;

                Page<Object[]> page = tagLogRepository.getRoomHistoricalValues(
                                request.categoryId(),
                                request.roomId(),
                                request.interval(),
                                request.fromDate(),
                                request.toDate(),
                                finalPageable);

                return page.map(row -> new RoomHistoricalValueDto(
                                row[0] == null ? null : ((Number) row[0]).doubleValue(),
                                row[1] == null ? null : ((Number) row[1]).doubleValue(),
                                row[2] == null ? null : ((Number) row[2]).doubleValue(),
                                ((java.sql.Timestamp) row[3]).toLocalDateTime()));
        }

        @Override
        public List<RoomCurrentValueDto> getCurrentRoomMetricsByCategory(Long categoryId) {
                return tagCurrentValueRepository.getCurrentRoomMetricsByCategory(categoryId)
                                .stream()
                                .sorted(
                                                Comparator.comparingInt(dto -> {
                                                        String room = dto.roomName();
                                                        String number = room.replaceAll("\\D+", "");
                                                        return number.isEmpty() ? Integer.MAX_VALUE
                                                                        : Integer.parseInt(number);
                                                }))
                                .toList();
        }

        @Override
        public List<RoomStatCardDto> getRoomStatCard() {
                List<RoomStatCardDto> response = new ArrayList<>();
                response.add(new RoomStatCardDto(0L, "Total Rooms", roomRepository.count()));
                response.addAll(categoryRepository.getRoomStatCard());
                return response;
        }

        @Override
        public List<CommonRoomResponse> getCommonRoomLog(CommonRoomRequest request) {
                List<Long> roomIds = request.roomIds();
                if (roomIds == null || roomIds.isEmpty()) {
                        roomIds = roomRepository.findIdsByCategory(request.categoryId());
                }
                List<Object[]> result = tagLogRepository.getCommonRoomLogs(
                                roomIds,
                                request.interval(),
                                request.fromDate(),
                                request.toDate());

                List<CommonRoomLogFlatResponse> rows = result.stream()
                                .map(r -> new CommonRoomLogFlatResponse(
                                                ((Number) r[0]).longValue(),
                                                (String) r[1],
                                                ((java.sql.Timestamp) r[2]).toLocalDateTime(),
                                                r[3] == null ? null : ((Number) r[3]).doubleValue(),
                                                r[4] == null ? null : ((Number) r[4]).doubleValue()))
                                .toList();

                Map<Long, CommonRoomResponse> map = new LinkedHashMap<>();
                for (CommonRoomLogFlatResponse row : rows) {
                        CommonRoomResponse room = map.computeIfAbsent(
                                        row.roomId(),
                                        id -> new CommonRoomResponse(
                                                        row.roomId(),
                                                        row.roomName(),
                                                        new ArrayList<>()));
                        room.logs().add(new CommonRoomLogResponse(
                                        row.timeStamp(),
                                        row.avgTemp(),
                                        row.rh()));
                }
                return new ArrayList<>(map.values());
        }

        @Override
        public Page<CommonRoomResponse> getCommonRoomLog(
                        CommonRoomRequest request,
                        Pageable pageable) {

                Page<Room> roomPage;

                if (request.roomIds() == null || request.roomIds().isEmpty()) {

                        roomPage = roomRepository.findByCategoryId(
                                        request.categoryId(),
                                        pageable);

                } else {

                        List<Room> rooms = roomRepository.findAllById(request.roomIds());

                        int start = (int) pageable.getOffset();
                        int end = Math.min(start + pageable.getPageSize(), rooms.size());

                        List<Room> pageRooms = rooms.subList(start, end);

                        roomPage = new PageImpl<>(
                                        pageRooms,
                                        pageable,
                                        rooms.size());
                }

                List<Long> roomIds = roomPage
                                .stream()
                                .map(Room::getId)
                                .toList();

                if (roomIds.isEmpty()) {
                        return Page.empty(pageable);
                }

                List<Object[]> result = tagLogRepository.getCommonRoomLogs(
                                roomIds,
                                request.interval(),
                                request.fromDate(),
                                request.toDate());

                List<CommonRoomLogFlatResponse> rows = result.stream()
                                .map(r -> new CommonRoomLogFlatResponse(
                                                ((Number) r[0]).longValue(),
                                                (String) r[1],
                                                ((java.sql.Timestamp) r[2]).toLocalDateTime(),
                                                r[3] == null ? null : ((Number) r[3]).doubleValue(),
                                                r[4] == null ? null : ((Number) r[4]).doubleValue()))
                                .toList();

                Map<Long, CommonRoomResponse> map = new LinkedHashMap<>();

                for (CommonRoomLogFlatResponse row : rows) {

                        CommonRoomResponse room = map.computeIfAbsent(
                                        row.roomId(),
                                        id -> new CommonRoomResponse(
                                                        row.roomId(),
                                                        row.roomName(),
                                                        new ArrayList<>()));

                        room.logs().add(new CommonRoomLogResponse(
                                        row.timeStamp(),
                                        row.avgTemp(),
                                        row.rh()));
                }

                return new PageImpl<>(
                                new ArrayList<>(map.values()),
                                pageable,
                                roomPage.getTotalElements());
        }
}