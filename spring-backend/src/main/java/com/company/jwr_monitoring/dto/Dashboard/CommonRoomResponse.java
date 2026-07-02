package com.company.jwr_monitoring.dto.Dashboard;

import java.util.List;

public record CommonRoomResponse(
        Long roomId,
        String roomName,
        List<CommonRoomLogResponse> logs

) {

}
