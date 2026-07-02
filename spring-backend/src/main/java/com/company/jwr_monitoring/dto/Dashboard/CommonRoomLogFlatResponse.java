package com.company.jwr_monitoring.dto.Dashboard;

import java.time.LocalDateTime;

public record CommonRoomLogFlatResponse(
        Long roomId,
        String roomName,
        LocalDateTime timeStamp,
        Double avgTemp,
        Double rh) {

}
