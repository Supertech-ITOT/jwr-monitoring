
package com.company.jwr_monitoring.mapper;

import org.springframework.stereotype.Component;

import com.company.jwr_monitoring.dto.Room.RoomDto;
import com.company.jwr_monitoring.entity.Room;

@Component
public class RoomMapper {

    public RoomDto toDto(Room room) {
        if (room == null) {
            return null;
        }
        return RoomDto.builder()
                .id(room.getId())
                .name(room.getName())
                .build();
    }
}
