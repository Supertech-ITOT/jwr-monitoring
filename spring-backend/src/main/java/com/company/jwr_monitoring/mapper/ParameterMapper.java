package com.company.jwr_monitoring.mapper;

import org.springframework.stereotype.Component;

import com.company.jwr_monitoring.dto.ParameterDto;
import com.company.jwr_monitoring.entity.Parameter;

@Component
public class ParameterMapper {
    public ParameterDto toDto(Parameter parameter) {
        return new ParameterDto(
                parameter.getId(),
                parameter.getName(),
                parameter.getUom(),
                parameter.getType());
    }

    public Parameter toEntity(ParameterDto dto) {
        return Parameter.builder()
                .id(dto.id())
                .name(dto.name())
                .uom(dto.uom())
                .type(dto.type())
                .build();
    }

}
