package com.company.jwr_monitoring.services.Impl;

import com.company.jwr_monitoring.dto.Room.RoomDto;
import com.company.jwr_monitoring.entity.Room;
import com.company.jwr_monitoring.exception.ResourceNotFoundException;
import com.company.jwr_monitoring.mapper.RoomMapper;
import com.company.jwr_monitoring.repository.RoomRepository;
import com.company.jwr_monitoring.services.RoomService;

import lombok.RequiredArgsConstructor;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {
    private final RoomRepository roomRepository;
    private final RoomMapper roomMapper;

    @Override
    public List<RoomDto> getRoomsByCategoryId(Long categoryId) {

        if (categoryId == null) {
            return List.of();
        }

        return roomRepository.findByCategoryId(categoryId)
                .stream()
                .map(roomMapper::toDto)
                .toList();
    }

    @Override
    public RoomDto getRoomById(Long id) {
        Room room = roomRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Room not found"));
        return roomMapper.toDto(room);
    }
}
