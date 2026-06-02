package com.company.jwr_monitoring.dto;

public record RoomDto(
        Long id,
        String name,
        Long categoryId,
        String categoryname) {
}