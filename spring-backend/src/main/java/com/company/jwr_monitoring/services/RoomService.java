package com.company.jwr_monitoring.services;

import com.company.jwr_monitoring.dto.RoomDto;
import com.company.jwr_monitoring.mapper.RoomMapper;
import com.company.jwr_monitoring.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;
    private final RoomMapper roomMapper;

    public List<RoomDto> getRooms(
            Long categoryId) {

        // filter by category
        if (categoryId != null) {

            return roomRepository.findByCategoryId(categoryId)
                    .stream()
                    .map(roomMapper::toDto)
                    .toList();
        }

        // get all rooms
        return roomRepository.findAll()
                .stream()
                .map(roomMapper::toDto)
                .toList();
    }
}
