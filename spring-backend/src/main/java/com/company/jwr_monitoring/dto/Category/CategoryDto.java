package com.company.jwr_monitoring.dto.Category;

import lombok.Builder;

@Builder
public record CategoryDto(
                Long id,
                String name) {
}
