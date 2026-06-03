package com.company.jwr_monitoring.mapper;

import java.time.LocalDateTime;

import org.springframework.stereotype.Component;

import com.company.jwr_monitoring.dto.TagLog.TagLogDto;
import com.company.jwr_monitoring.entity.TagLog;
import com.company.jwr_monitoring.entity.TagMaster;

@Component
public class TagLogMapper {

    public TagLog toEntity(TagLogDto dto, TagMaster tag) {
        return TagLog.builder()
                .tag(tag)
                .value(dto.value())
                .timestamp(LocalDateTime.now())
                .build();
    }

    public TagLogDto toDto(TagLog entity) {
        return new TagLogDto(
                entity.getTag().getId(),
                entity.getTag().getTagName(),
                entity.getValue());
    }
}