package com.company.jwr_monitoring.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "logging_config")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoggingConfig {

    @Id
    private Long id;

    @Column(nullable = false)
    private Integer loggingIntervalMinutes;

    private LocalDateTime lastExecutionTime;
}
