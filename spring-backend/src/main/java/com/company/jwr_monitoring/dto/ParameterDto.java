package com.company.jwr_monitoring.dto;

import com.company.jwr_monitoring.entity.DataType;

public record ParameterDto(
                Long id,
                String name,
                String uom,
                DataType type) {
}
