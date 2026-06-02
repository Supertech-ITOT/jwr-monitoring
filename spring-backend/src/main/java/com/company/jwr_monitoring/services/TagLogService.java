package com.company.jwr_monitoring.services;

import org.springframework.data.domain.Page;

import com.company.jwr_monitoring.dto.TagParameterLogDto;
import com.company.jwr_monitoring.dto.TagParameterLogRequest;

public interface TagLogService {
    Page<TagParameterLogDto> getParameterLogs(TagParameterLogRequest request);

}
