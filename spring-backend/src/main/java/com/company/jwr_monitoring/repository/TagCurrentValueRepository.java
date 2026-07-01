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
                    ROUND(MAX(tcv.value), 2),
                    MAX(tcv.lastUpdated)
                )
                FROM TagCurrentValue tcv
                JOIN tcv.tag t
                JOIN t.room r
                JOIN r.category c
                JOIN t.parameter p
                WHERE c.id = :categoryId
                  AND p.id = :parameterId
                GROUP BY r.id, r.name
                ORDER BY r.name ASC
            """)
    List<RoomCurrentValueDto> getCurrentRoomMetricsByCategoryAndParameter(
            @Param("categoryId") Long categoryId,
            @Param("parameterId") Long parameterId);
}