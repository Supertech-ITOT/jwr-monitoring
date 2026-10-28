package com.company.jwr_monitoring.services.Impl;

import java.util.*;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.company.jwr_monitoring.dto.Energy.EnergyConsumptionRequestDto;
import com.company.jwr_monitoring.dto.Energy.EnergyConsumptionResponseDto;
import com.company.jwr_monitoring.dto.Energy.RoomEnergyDto;
import com.company.jwr_monitoring.enums.RoomType;
import com.company.jwr_monitoring.repository.TagLogRepository;
import com.company.jwr_monitoring.repository.TagMasterRepository;
import com.company.jwr_monitoring.repository.RoomRepository;
import com.company.jwr_monitoring.services.EnergyService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EnergyServiceImpl implements EnergyService {

        private final TagMasterRepository tagMasterRepository;
        private final TagLogRepository tagLogRepository;
        private final RoomRepository roomRepository;

        @Override
        public EnergyConsumptionResponseDto getEnergyConsumptionData(
                        EnergyConsumptionRequestDto request) {

                // Validate room IDs
                List<Long> roomIds = request.roomIds() == null
                                ? Collections.emptyList()
                                : request.roomIds().stream()
                                                .filter(Objects::nonNull)
                                                .distinct()
                                                .toList();

                if (roomIds.isEmpty()) {
                        return new EnergyConsumptionResponseDto(
                                        List.of(), 0.0, 0.0, 0.0, 0.0);
                }

                // Get room names
                Map<Long, String> roomNames = roomRepository.findAllById(roomIds)
                                .stream()
                                .collect(Collectors.toMap(
                                                room -> room.getId(),
                                                room -> room.getName()));

                // Get active positive and negative rooms
                List<Long> positiveRunTagIds = tagMasterRepository.getTagIdByCategoryIdAndParameterId(1L, 7L);
                List<Long> negativeRunTagIds = tagMasterRepository.getTagIdByCategoryIdAndParameterId(2L, 7L);
                long positiveActiveRooms = Optional.ofNullable(
                                tagLogRepository.countActiveTagsAtDate(positiveRunTagIds, request.toDate()))
                                .orElse(0L);
                long negativeActiveRooms = Optional.ofNullable(
                                tagLogRepository.countActiveTagsAtDate(negativeRunTagIds, request.toDate()))
                                .orElse(0L);

                // Component A: calculate consumption for each room
                List<Long> componentATagIds = tagMasterRepository.getTagIdByRoom(roomIds);
                Map<Long, Double> componentAByRoom = new HashMap<>();
                List<Object[]> componentARows = tagLogRepository.getEnergyConsumptionByTagIds(
                                componentATagIds,
                                request.fromDate(),
                                request.toDate());
                for (Object[] row : componentARows) {
                        Long roomId = ((Number) row[1]).longValue();
                        double consumption = row[2] == null || row[3] == null ? 0.0
                                        : Math.max(0.0, ((Number) row[2]).doubleValue()
                                                        - ((Number) row[3]).doubleValue());
                        componentAByRoom.merge(roomId, consumption, Double::sum);
                }

                // Component B: select tags according to room type
                List<Long> positiveCategoryIds = List.of(7L, 6L, 9L);
                List<Long> negativeCategoryIds = List.of(8L, 11L, 12L);
                List<Long> componentBTagIds = tagMasterRepository.getTagIdsByCategoryIdsAndParameterId(
                                request.roomType() == RoomType.POSITIVE ? positiveCategoryIds : negativeCategoryIds,
                                2L);
                long componentBActiveRooms = request.roomType() == RoomType.POSITIVE ? positiveActiveRooms
                                : negativeActiveRooms;
                double componentBSum = 0.0;
                if (componentBTagIds != null && !componentBTagIds.isEmpty()) {
                        componentBSum = tagLogRepository
                                        .getEnergyConsumptionByTagIds(componentBTagIds, request.fromDate(),
                                                        request.toDate())
                                        .stream()
                                        .filter(row -> row[1] != null)
                                        .mapToDouble(row -> ((Number) row[1]).doubleValue())
                                        .sum();
                }
                double componentBTotal = componentBActiveRooms > 0 ? componentBSum / componentBActiveRooms : 0.0;

                // Component C: common categories
                List<Long> componentCTagIds = tagMasterRepository
                                .getTagIdsByCategoryIdsAndParameterId(List.of(3L, 4L, 5L, 10L, 13L), 2L);
                double componentCSum = 0.0;
                if (componentCTagIds != null && !componentCTagIds.isEmpty()) {
                        componentCSum = tagLogRepository
                                        .getEnergyConsumptionByTagIds(componentCTagIds, request.fromDate(),
                                                        request.toDate())
                                        .stream()
                                        .filter(row -> row[1] != null)
                                        .mapToDouble(row -> ((Number) row[1]).doubleValue())
                                        .sum();
                }
                long allActiveRooms = positiveActiveRooms + negativeActiveRooms;
                double componentCTotal = allActiveRooms > 0 ? componentCSum / allActiveRooms : 0.0;

                // Map each room to RoomEnergyDto
                // Component B and C are report-level averages in this implementation.

                // Get running room IDs at the requested toDate
                Set<Long> runningRoomIds = new HashSet<>(
                                tagLogRepository.findRunningRoomIds(
                                                roomIds,
                                                request.toDate()));

                // Map each room to RoomEnergyDto
                List<RoomEnergyDto> rooms = roomIds.stream()
                                .filter(roomNames::containsKey)
                                .map(roomId -> {
                                        // If room is inactive, return zero for all components
                                        if (!runningRoomIds.contains(roomId)) {
                                                return new RoomEnergyDto(
                                                                roomId,
                                                                roomNames.get(roomId),
                                                                0.0, // Component A
                                                                0.0, // Component B
                                                                0.0, // Component C
                                                                0.0 // Total Energy
                                                );
                                        }

                                        // Calculate energy only for active rooms
                                        double componentA = componentAByRoom.getOrDefault(roomId, 0.0);
                                        double componentB = componentBTotal;
                                        double componentC = componentCTotal;
                                        double totalEnergy = componentA + componentB + componentC;
                                        return new RoomEnergyDto(
                                                        roomId,
                                                        roomNames.get(roomId),
                                                        componentA,
                                                        componentB,
                                                        componentC,
                                                        totalEnergy);
                                })
                                .toList();

                // Calculate response totals
                double componentATotal = rooms.stream().mapToDouble(RoomEnergyDto::componentA).sum();
                double componentBResponseTotal = rooms.stream().mapToDouble(RoomEnergyDto::componentB).sum();
                double componentCResponseTotal = rooms.stream().mapToDouble(RoomEnergyDto::componentC).sum();
                double totalEnergy = rooms.stream().mapToDouble(RoomEnergyDto::totalEnergy).sum();
                return new EnergyConsumptionResponseDto(
                                rooms,
                                componentATotal,
                                componentBResponseTotal,
                                componentCResponseTotal,
                                totalEnergy);
        }
}
