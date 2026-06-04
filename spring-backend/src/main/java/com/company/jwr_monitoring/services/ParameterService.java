package com.company.jwr_monitoring.services;

import java.util.List;

import com.company.jwr_monitoring.dto.Parameter.ParameterDto;

public interface ParameterService {
    List<ParameterDto> getParameters();
}