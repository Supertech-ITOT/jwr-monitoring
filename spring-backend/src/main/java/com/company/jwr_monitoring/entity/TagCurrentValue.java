package com.company.jwr_monitoring.entity;

import java.time.LocalDateTime;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Getter
@Setter
@Table(name = "tag_current_values")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TagCurrentValue {

    @Id
    private Long tagId;

    private Double value;

    private LocalDateTime lastUpdated;
}