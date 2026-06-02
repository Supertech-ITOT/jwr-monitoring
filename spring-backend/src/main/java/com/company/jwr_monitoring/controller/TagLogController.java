package com.company.jwr_monitoring.controller;

import com.company.jwr_monitoring.dto.TagLogDto;
import com.company.jwr_monitoring.services.TagLogService;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/tag-logs")
@RequiredArgsConstructor
public class TagLogController {

    private final TagLogService tagLogService;

    @GetMapping
    public Page<TagLogDto> getLogs(

            @RequestParam(required = false) Long categoryId,

            @RequestParam(required = false) Long roomId,

            @RequestParam(required = false) Long parameterId,

            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fromDate,

            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime toDate,

            Pageable pageable) {

        return tagLogService.getLogs(
                categoryId,
                roomId,
                parameterId,
                fromDate,
                toDate,
                pageable);
    }
}