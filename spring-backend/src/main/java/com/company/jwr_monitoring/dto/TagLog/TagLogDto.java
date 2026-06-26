package com.company.jwr_monitoring.dto.TagLog;

import java.time.LocalDateTime;

import lombok.Builder;

@Builder
public record TagLogDto(
                Long tagId,
                String tagName,
                Double value,
                LocalDateTime timestamp

) {
}
