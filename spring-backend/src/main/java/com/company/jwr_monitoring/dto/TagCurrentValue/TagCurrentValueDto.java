package com.company.jwr_monitoring.dto.TagCurrentValue;

import java.time.LocalDateTime;

public record TagCurrentValueDto(
                Long id,
                Long tagId,
                Double value,
                LocalDateTime lastUpdated) {
}
