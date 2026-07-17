package com.company.jwr_monitoring.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.company.jwr_monitoring.dto.Dashboard.RoomCurrentValueDto;
import com.company.jwr_monitoring.entity.TagCurrentValue;

public interface TagCurrentValueRepository extends JpaRepository<TagCurrentValue, Long> {

    Optional<TagCurrentValue> findByTagId(Long tagId);

    @Query("""
            SELECT new com.company.jwr_monitoring.dto.Dashboard.RoomCurrentValueDto(
                r.id,
                r.name,
                COALESCE(MAX(CASE
                    WHEN t.parameter.id = 1 THEN tcv.value
                END), 0.0),

                COALESCE(MAX(CASE
                    WHEN t.parameter.id = 2 THEN tcv.value
                END), 0.0),

                COALESCE(MAX(CASE
                    WHEN t.parameter.id = 3 THEN tcv.value
                END), 0.0),

                CASE
                    WHEN COALESCE(MAX(CASE
                        WHEN t.parameter.id = 7 THEN tcv.value
                    END), 0.0) > 0 THEN true ELSE false
                END,

                MAX(tcv.lastUpdated)
            )
            FROM TagCurrentValue tcv
            JOIN tcv.tag t
            JOIN t.room r
            JOIN r.category c
            WHERE c.id = :categoryId
            GROUP BY r.id, r.name
            ORDER BY r.name
            """)
    List<RoomCurrentValueDto> getCurrentRoomMetricsByCategory(
            @Param("categoryId") Long categoryId);
}