package com.company.jwr_monitoring.services;

import com.company.jwr_monitoring.dto.Room.RoomDto;

import java.util.List;

public interface RoomService {
    List<RoomDto> getRoomsByCategoryId(Long categoryId);
}
