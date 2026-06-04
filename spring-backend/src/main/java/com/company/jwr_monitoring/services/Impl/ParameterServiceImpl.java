package com.company.jwr_monitoring.services.Impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.company.jwr_monitoring.dto.Parameter.ParameterDto;
import com.company.jwr_monitoring.mapper.ParameterMapper;
import com.company.jwr_monitoring.repository.ParameterRepository;
import com.company.jwr_monitoring.services.ParameterService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ParameterServiceImpl implements ParameterService {
    private final ParameterRepository parameterRepository;
    private final ParameterMapper parameterMapper;

    @Override
    public List<ParameterDto> getParameters() {
        return parameterRepository.findAll().stream().map(parameterMapper::toDto).toList();
    }

}
