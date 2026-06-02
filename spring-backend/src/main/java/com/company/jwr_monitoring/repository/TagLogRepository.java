package com.company.jwr_monitoring.repository;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.company.jwr_monitoring.entity.TagLog;

public interface TagLogRepository extends JpaRepository<TagLog, Long> {
    @Query("""
            SELECT tl
            FROM TagLog tl
            WHERE
                (:categoryId IS NULL
                    OR tl.tag.room.category.id = :categoryId)
            AND
                (:roomId IS NULL
                    OR tl.tag.room.id = :roomId)
            AND
                (:parameterId IS NULL
                    OR tl.tag.parameter.id = :parameterId)
            AND
                (
                    CAST(:fromDate AS timestamp) IS NULL
                    OR tl.timestamp >= :fromDate
                )
            AND
                (
                    CAST(:toDate AS timestamp) IS NULL
                    OR tl.timestamp <= :toDate
                )
            """)
    Page<TagLog> findLogs(
            @Param("categoryId") Long categoryId,
            @Param("roomId") Long roomId,
            @Param("parameterId") Long parameterId,
            @Param("fromDate") LocalDateTime fromDate,
            @Param("toDate") LocalDateTime toDate,
            Pageable pageable);

}