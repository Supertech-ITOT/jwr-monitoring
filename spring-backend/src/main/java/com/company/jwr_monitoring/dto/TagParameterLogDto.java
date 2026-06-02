package com.company.jwr_monitoring.dto;

import java.time.LocalDateTime;

public record TagParameterLogDto(
        Double AvgTemperature,
        Double Energy,
        Double RH,
        LocalDateTime timestamp) {
}