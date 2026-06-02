package com.company.jwr_monitoring.mapper;

import com.company.jwr_monitoring.dto.RoomDto;
import com.company.jwr_monitoring.entity.Category;
import com.company.jwr_monitoring.entity.Room;

public class RoomMapper {
    public RoomDto toDto(Room room) {
        return new RoomDto(
                room.getId(),
                room.getName(),
                room.getCategory().getId(),
                room.getCategory().getName());
    }

    public Room toEntity(RoomDto dto) {
        return Room.builder()
                .id(dto.id())
                .name(dto.name())
                .category(Category.builder().id(dto.categoryId()).build())
                .build();
    }

}
