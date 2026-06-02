package com.company.jwr_monitoring.mapper;

import com.company.jwr_monitoring.dto.TagLogDto;
import com.company.jwr_monitoring.entity.TagLog;
import com.company.jwr_monitoring.entity.TagMaster;
import org.springframework.stereotype.Component;

@Component
public class TagLogMapper {

    public TagLogDto toDto(
            TagLog tagLog) {

        return new TagLogDto(
                tagLog.getId(),
                tagLog.getTag().getId(),
                tagLog.getTag().getTagName(),
                tagLog.getValue(),
                tagLog.getTimestamp());
    }

    public TagLog toEntity(
            TagLogDto dto) {

        return TagLog.builder()
                .id(dto.id())
                .tag(
                        TagMaster.builder()
                                .id(dto.tagId())
                                .build())
                .value(dto.value())
                .timestamp(dto.timestamp())
                .build();
    }
}