package com.company.jwr_monitoring.dto.Dashboard;

import java.util.List;

public record EnergyRoomResponse(
        Long roomId,
        String roomName,
        List<EnergyRoomLogResponse> logs

) {

}
