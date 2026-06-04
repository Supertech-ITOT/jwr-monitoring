package com.company.jwr_monitoring.mapper;

import java.time.LocalDateTime;

import org.springframework.stereotype.Component;

import com.company.jwr_monitoring.entity.TagCurrentValue;

@Component
public class TagCurrentValueMapper {

    public void updateEntity(TagCurrentValue entity, Double value, LocalDateTime timestamp) {
        entity.setValue(value);
        entity.setLastUpdated(timestamp);
    }
}