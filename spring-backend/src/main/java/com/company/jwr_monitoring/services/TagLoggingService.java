package com.company.jwr_monitoring.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.company.jwr_monitoring.entity.TagLog;
import com.company.jwr_monitoring.entity.TagMaster;
import com.company.jwr_monitoring.repository.TagLogRepository;
import com.company.jwr_monitoring.repository.TagMasterRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TagLoggingService {

    private final TagMasterRepository tagMasterRepository;
    private final TagLogRepository tagLogRepository;

    public void logAllTags() {
        List<TagMaster> tags = tagMasterRepository.findAll();
        for (TagMaster tag : tags) {
            TagLog log = new TagLog();
            log.setTag(tag);
            log.setValue(0.0);
            log.setTimestamp(LocalDateTime.now());
            tagLogRepository.save(log);
        }
    }
}