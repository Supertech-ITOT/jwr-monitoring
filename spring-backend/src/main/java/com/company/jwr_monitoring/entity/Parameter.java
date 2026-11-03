
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
    @Column(name = "id")
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "uom", nullable = false)
    private String uom;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private DataType type;
}
