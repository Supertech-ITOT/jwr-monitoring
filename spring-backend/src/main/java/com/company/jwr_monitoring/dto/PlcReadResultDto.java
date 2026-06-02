package com.company.jwr_monitoring.dto;

public record PlcReadResultDto(

        Long tagId,

        String tagName,

        Double value

) {
}
