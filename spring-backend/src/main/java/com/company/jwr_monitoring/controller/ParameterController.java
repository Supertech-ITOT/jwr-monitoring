
package com.company.jwr_monitoring.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.company.jwr_monitoring.dto.Common.ApiResponse;
import com.company.jwr_monitoring.dto.Parameter.ParameterDto;
import com.company.jwr_monitoring.services.ParameterService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/parameters")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ParameterController {

    private final ParameterService parameterService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ParameterDto>>> getAllParameters() {
        List<ParameterDto> parameters = parameterService.getAllParameters();
        return ResponseEntity.ok(ApiResponse.success("Parameters fetched successfully", parameters));
    }
}
