package com.company.jwr_monitoring.dto.TagLog;

import java.time.LocalDateTime;

public record TagLogDto(
        Long tagId,
        String tagName,
        Double value,
        LocalDateTime timestamp

) {
}
