package com.company.jwr_monitoring.services.Impl;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.springframework.stereotype.Service;
import com.company.jwr_monitoring.dto.Energy.EnergyConsumptionRequestDto;
import com.company.jwr_monitoring.dto.Energy.EnergyConsumptionResponseDto;
import com.company.jwr_monitoring.enums.RoomType;
import com.company.jwr_monitoring.repository.TagLogRepository;
import com.company.jwr_monitoring.repository.TagMasterRepository;
import com.company.jwr_monitoring.services.EnergyService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EnergyServiceImpl implements EnergyService {

    private final TagMasterRepository tagMasterRepository;
    private final TagLogRepository tagLogRepository;

    @Override
    public EnergyConsumptionResponseDto getEnergyConsumptionData(EnergyConsumptionRequestDto request) {
        List<Long> tagIds = tagMasterRepository.getTagIdByRoom(request.roomIds());
        Map<Long, Double> componentA = tagLogRepository
                .getEnergyConsumptionByTagIds(tagIds, request.fromDate(), request.toDate())
                .stream()
                .collect(Collectors.toMap(
                        row -> ((Number) row[0]).longValue(),
                        row -> ((Number) row[1]).doubleValue()));

        List<Long> positiveCompTagIds = tagMasterRepository.getTagIdByCategoryIdAndParameterId(7L, 2L);
        List<Long> negativeCompTagIds = tagMasterRepository.getTagIdByCategoryIdAndParameterId(8L, 2L);
        List<Long> positiveConTagIds = tagMasterRepository.getTagIdByCategoryIdAndParameterId(6L, 2L);
        List<Long> negativeConTagIds = tagMasterRepository.getTagIdByCategoryIdAndParameterId(11L, 2L);
        List<Long> positiveRecTagIds = tagMasterRepository.getTagIdByCategoryIdAndParameterId(9L, 2L);
        List<Long> negativeRecTagIds = tagMasterRepository.getTagIdByCategoryIdAndParameterId(12L, 2L);
        List<Long> positiveRunTagIds = tagMasterRepository.getTagIdByCategoryIdAndParameterId(1L, 7L);
        List<Long> negativeRunTagIds = tagMasterRepository.getTagIdByCategoryIdAndParameterId(2L, 7L);

        List<Long> positiveComponentTagIds = Stream.of(
                positiveCompTagIds,
                positiveConTagIds,
                positiveRecTagIds)
                .flatMap(List::stream)
                .distinct()
                .collect(Collectors.toList());
        List<Long> negativeComponentTagIds = Stream.of(
                negativeCompTagIds,
                negativeConTagIds,
                negativeRecTagIds)
                .flatMap(List::stream)
                .distinct()
                .collect(Collectors.toList());

        List<Long> selectedTagIds = request.roomType() == RoomType.POSITIVE ? positiveComponentTagIds
                : negativeComponentTagIds;

        Long activeRoom = request.roomType() == RoomType.POSITIVE ? tagLogRepository.countActiveTagsAtDate(positiveRunTagIds,request.toDate()):tagLogRepository.countActiveTagsAtDate(negativeRunTagIds,request.toDate())

        Map<Long, Double> componentB = tagLogRepository
                .getEnergyConsumptionByTagIds(selectedTagIds, request.fromDate(), request.toDate())
                .stream()
                .collect(Collectors.toMap(
                        row -> ((Number) row[0]).longValue(),
                        row -> row[1] == null ? 0.0 : ((Number) row[1]).doubleValue()));
    }

}
