package com.company.jwr_monitoring.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tag_logs", indexes = {
        @Index(name = "idx_tag_log_tag", columnList = "tag_id"),
        @Index(name = "idx_tag_log_timestamp", columnList = "timestamp"),
        @Index(name = "idx_tag_log_tag_timestamp", columnList = "tag_id, timestamp")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TagLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "tag_id")
    private TagMaster tag;

    private Double value;

    private LocalDateTime timestamp;
}