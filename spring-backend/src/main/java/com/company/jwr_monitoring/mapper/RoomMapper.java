package com.company.jwr_monitoring.mapper;

import org.springframework.stereotype.Component;

import com.company.jwr_monitoring.dto.Room.RoomDto;
import com.company.jwr_monitoring.entity.Room;

@Component
public class RoomMapper {
    public RoomDto toDto(Room room) {
        return new RoomDto(
                room.getId(),
                room.getName());
    }

}
