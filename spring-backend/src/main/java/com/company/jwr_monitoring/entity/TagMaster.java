package com.company.jwr_monitoring.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tag_master", uniqueConstraints = {
        @UniqueConstraint(name = "uk_tag_master_ip_port_register", columnNames = {
                "ip_address",
                "port",
                "register_address"
        })
},

        indexes = {
                @Index(name = "idx_tag_master_room", columnList = "room_id"),

                @Index(name = "idx_tag_master_parameter", columnList = "parameter_id"),

                @Index(name = "idx_tag_master_ip", columnList = "ip_address"),

                @Index(name = "idx_tag_master_port", columnList = "port"),

                @Index(name = "idx_tag_master_register", columnList = "register_address"),

                @Index(name = "idx_tag_master_ip_port_register", columnList = "ip_address, port, register_address")
        })
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TagMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tag_name", nullable = false)
    private String tagName;

    @Column(name = "ip_address", nullable = false)
    private String ipAddress;

    @Column(nullable = false)
    private Integer port;

    @Column(name = "register_address", nullable = false)
    private Integer registerAddress;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parameter_id", nullable = false)
    private Parameter parameter;
}