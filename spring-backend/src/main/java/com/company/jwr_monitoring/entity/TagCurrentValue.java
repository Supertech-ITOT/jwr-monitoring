package com.company.jwr_monitoring.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Table(name = "tag_current_values", indexes = {
        @Index(name = "idx_tag_current_value_tag", columnList = "tag_id"),
        @Index(name = "idx_tag_current_value_last_updated", columnList = "last_updated")
}, uniqueConstraints = {
        @UniqueConstraint(name = "uk_tag_current_value_tag", columnNames = "tag_id")
})
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TagCurrentValue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "tag_id", nullable = false)
    private TagMaster tag;

    private Double value;

    @Column(name = "last_updated")
    private LocalDateTime lastUpdated;
}