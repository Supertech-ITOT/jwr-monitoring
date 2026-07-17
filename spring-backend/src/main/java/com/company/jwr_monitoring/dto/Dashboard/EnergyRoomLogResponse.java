package com.company.jwr_monitoring.dto.Dashboard;

import java.time.LocalDateTime;

public record EnergyRoomLogResponse(
        LocalDateTime timeStamp,
        Double energy,
        Double current,
        Double voltage,
        Double frequency) {

}
