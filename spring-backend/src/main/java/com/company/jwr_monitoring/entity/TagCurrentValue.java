
package com.company.jwr_monitoring.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tag_current_values", indexes = {
                @Index(name = "idx_tag_current_value_last_updated", columnList = "last_updated")
}, uniqueConstraints = {
                @UniqueConstraint(name = "uk_tag_current_value_tag", columnNames = "tag_id")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TagCurrentValue {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "tag_id", nullable = false)
        private TagMaster tag;

        @Column(name = "value")
        private Double value;

        @Column(name = "last_updated")
        private LocalDateTime lastUpdated;
}
