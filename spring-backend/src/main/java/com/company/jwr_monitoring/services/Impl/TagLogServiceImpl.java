package com.company.jwr_monitoring.services.Impl;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.company.jwr_monitoring.dto.TagParameterLogDto;
import com.company.jwr_monitoring.dto.TagParameterLogRequest;
import com.company.jwr_monitoring.mapper.TagLogMapper;
import com.company.jwr_monitoring.repository.TagLogRepository;
import com.company.jwr_monitoring.services.TagLogService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TagLogServiceImpl implements TagLogService {
    private final TagLogRepository tagLogRepository;
    private final TagLogMapper tagLogMapper;

    public Page<TagParameterLogDto> getParameterLogs(TagParameterLogRequest request) {
        return tagLogRepository.findParameterLogs(
                request.categoryId(),
                request.roomId(),
                request.fromDate(),
                request.toDate())
                .map(tagLogMapper::toDto);
    }

}
