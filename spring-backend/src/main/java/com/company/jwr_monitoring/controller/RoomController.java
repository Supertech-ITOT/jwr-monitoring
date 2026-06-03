package com.company.jwr_monitoring.controller;

import com.company.jwr_monitoring.dto.Room.RoomDto;
import com.company.jwr_monitoring.services.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @GetMapping
    public List<RoomDto> getRooms(
            @RequestParam(required = false) Long categoryId) {
        return roomService.getRooms(categoryId);
    }
}