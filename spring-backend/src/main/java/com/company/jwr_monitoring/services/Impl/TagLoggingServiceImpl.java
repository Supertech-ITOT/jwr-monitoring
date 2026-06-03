package com.company.jwr_monitoring.services.Impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.company.jwr_monitoring.dto.TagLog.TagLogDto;
import com.company.jwr_monitoring.entity.TagLog;
import com.company.jwr_monitoring.entity.TagMaster;
import com.company.jwr_monitoring.mapper.TagLogMapper;
import com.company.jwr_monitoring.plc.PlcReadService;
import com.company.jwr_monitoring.repository.TagLogRepository;
import com.company.jwr_monitoring.repository.TagMasterRepository;
import com.company.jwr_monitoring.services.TagLoggingService;

import lombok.*;

@Service
@RequiredArgsConstructor
public class TagLoggingServiceImpl implements TagLoggingService {
    private final TagMasterRepository tagMasterRepository;
    private final TagLogRepository tagLogRepository;
    private final TagLogMapper tagLogMapper;
    private final PlcReadService plcReadService;

    @Override
    public void logAllTags() {
        List<TagMaster> tags = tagMasterRepository.findAllWithParameter();
        for (TagMaster tag : tags) {
            TagLogDto result = plcReadService.readTag(tag);
            TagLog log = tagLogMapper.toEntity(result, tag);
            tagLogRepository.save(log);
        }
    }
}
