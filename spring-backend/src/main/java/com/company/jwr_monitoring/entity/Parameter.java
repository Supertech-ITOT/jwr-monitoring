package com.company.jwr_monitoring.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "parameters", indexes = {
        @Index(name = "idx_parameter_name", columnList = "name"),
        @Index(name = "idx_parameter_type", columnList = "type")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Parameter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String uom;

    @Column(nullable = false)
    private String type;
}
