package com.company.jwr_monitoring.dto.Dashboard;

import java.time.LocalDateTime;
import java.util.List;

public record CommonRoomRequest(
                Long categoryId,
                List<Long> roomIds,
                Integer interval,
                LocalDateTime fromDate,
                LocalDateTime toDate

) {

}
