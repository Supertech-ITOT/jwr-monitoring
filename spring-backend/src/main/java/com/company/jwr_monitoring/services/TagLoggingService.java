package com.company.jwr_monitoring.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.company.jwr_monitoring.dto.PlcReadResultDto;
import com.company.jwr_monitoring.entity.TagLog;
import com.company.jwr_monitoring.entity.TagMaster;
import com.company.jwr_monitoring.plc.PlcReadService;
import com.company.jwr_monitoring.repository.TagLogRepository;
import com.company.jwr_monitoring.repository.TagMasterRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TagLoggingService {

    private final TagMasterRepository tagMasterRepository;
    private final TagLogRepository tagLogRepository;
    private final PlcReadService plcReadService;

    public void logAllTags() {
        List<TagMaster> tags = tagMasterRepository.findAllWithParameter();
        for (TagMaster tag : tags) {
            PlcReadResultDto result = plcReadService.readTag(tag);
            TagLog log = new TagLog();
            log.setTag(tag);
            log.setValue(result.value());
            log.setTimestamp(LocalDateTime.now());
            tagLogRepository.save(log);
        }
    }
}