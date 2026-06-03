package com.company.jwr_monitoring.dto.TagMaster;

public record TagMasterDto(
        Long id,
        String tagName,
        String ipAddress,
        Integer port,
        Integer registerAddress,

        Long roomId,
        String roomName,

        Long parameterId,
        String parameterName) {
}
