package com.company.jwr_monitoring.mapper;

import com.company.jwr_monitoring.dto.TagMaster.TagMasterDto;
import com.company.jwr_monitoring.entity.Parameter;
import com.company.jwr_monitoring.entity.Room;
import com.company.jwr_monitoring.entity.TagMaster;
import org.springframework.stereotype.Component;

@Component
public class TagMasterMapper {

    public TagMasterDto toDto(
            TagMaster tagMaster) {

        return new TagMasterDto(
                tagMaster.getId(),
                tagMaster.getTagName(),
                tagMaster.getIpAddress(),
                tagMaster.getPort(),
                tagMaster.getRegisterAddress(),

                tagMaster.getRoom().getId(),
                tagMaster.getRoom().getName(),

                tagMaster.getParameter().getId(),
                tagMaster.getParameter().getName());
    }

    public TagMaster toEntity(
            TagMasterDto dto) {

        return TagMaster.builder()
                .id(dto.id())
                .tagName(dto.tagName())
                .ipAddress(dto.ipAddress())
                .port(dto.port())
                .registerAddress(dto.registerAddress())

                .room(
                        Room.builder()
                                .id(dto.roomId())
                                .build())

                .parameter(
                        Parameter.builder()
                                .id(dto.parameterId())
                                .build())
                .build();
    }
}