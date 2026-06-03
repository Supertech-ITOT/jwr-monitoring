package com.company.jwr_monitoring.controller;

import com.company.jwr_monitoring.dto.Common.ApiResponse;
import com.company.jwr_monitoring.dto.Room.RoomDto;
import com.company.jwr_monitoring.services.RoomService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
@CrossOrigin("*")
public class RoomController {

    private final RoomService roomService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<RoomDto>>> getRoomsByCategoryId(
            @RequestParam(required = false) Long categoryId) {
        List<RoomDto> rooms = roomService.getRoomsByCategoryId(categoryId);
        return ResponseEntity.ok(ApiResponse.success("Rooms fetched successfully", rooms));
    }
}