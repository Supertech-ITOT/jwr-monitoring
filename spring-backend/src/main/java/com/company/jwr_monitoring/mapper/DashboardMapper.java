package com.company.jwr_monitoring.mapper;

import java.sql.Timestamp;
import org.springframework.stereotype.Component;
import com.company.jwr_monitoring.dto.Dashboard.RoomHistoricalValueDto;

@Component
public class DashboardMapper {
    public RoomHistoricalValueDto toDto(Object[] row) {
        if (row == null) {
            return null;
        }

        return RoomHistoricalValueDto.builder()
                .avgTemperature(row[0] == null ? null : ((Number) row[0]).doubleValue())
                .rh(row[1] == null ? null : ((Number) row[1]).doubleValue())
                .timestamp(((Timestamp) row[2]).toLocalDateTime())
                .build();
    }

}
