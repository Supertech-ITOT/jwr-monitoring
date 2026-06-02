package com.company.jwr_monitoring.dto;

import java.time.LocalDateTime;

public record TagLogDto(
        Long id,
        Long tagId,
        String tagName,
        Double value,
        LocalDateTime timestamp) {
}