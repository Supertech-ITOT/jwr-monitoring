package com.company.jwr_monitoring.services;

import com.company.jwr_monitoring.dto.TagLogDto;
import com.company.jwr_monitoring.mapper.TagLogMapper;
import com.company.jwr_monitoring.repository.TagLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class TagLogService {

    private final TagLogRepository tagLogRepository;
    private final TagLogMapper tagLogMapper;

    public Page<TagLogDto> getLogs(
            Long categoryId,
            Long roomId,
            Long parameterId,
            LocalDateTime fromDate,
            LocalDateTime toDate,
            Pageable pageable) {

        return tagLogRepository.findLogs(
                categoryId,
                roomId,
                parameterId,
                fromDate,
                toDate,
                pageable)
                .map(tagLogMapper::toDto);
    }
}
