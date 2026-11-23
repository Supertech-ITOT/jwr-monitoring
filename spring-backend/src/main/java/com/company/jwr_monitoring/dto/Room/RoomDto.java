package com.company.jwr_monitoring.dto.Room;

import lombok.Builder;

@Builder
public record RoomDto(
                Long id,
                String name) {
}