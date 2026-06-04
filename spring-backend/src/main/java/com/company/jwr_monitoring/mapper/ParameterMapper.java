package com.company.jwr_monitoring.mapper;

import org.springframework.stereotype.Component;

import com.company.jwr_monitoring.dto.Parameter.ParameterDto;
import com.company.jwr_monitoring.entity.Parameter;

@Component
public class ParameterMapper {
    public ParameterDto toDto(Parameter parameter) {
        return new ParameterDto(
                parameter.getId(),
                parameter.getName());
    }
}
