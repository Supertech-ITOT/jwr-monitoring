package com.company.jwr_monitoring.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.company.jwr_monitoring.dto.Dashboard.RoomHistoricalValueDto;
import com.company.jwr_monitoring.entity.TagLog;

public interface TagLogRepository extends JpaRepository<TagLog, Long> {

    @Query(value = """
            SELECT new com.company.jwr_monitoring.dto.Dashboard.RoomHistoricalValueDto(
                ROUND(MAX(CASE WHEN p.name = 'Temperature' THEN tl.value END),2),
                ROUND(MAX(CASE WHEN p.name = 'RH' THEN tl.value END),2),
                ROUND(MAX(CASE WHEN p.name = 'Energy' THEN tl.value END),2),
                tl.timestamp
            )
            FROM TagLog tl
            JOIN tl.tag t
            JOIN t.room r
            JOIN r.category c
            JOIN t.parameter p
            WHERE c.id = :categoryId
              AND r.id = :roomId
              AND tl.timestamp BETWEEN :fromDate AND :toDate
            GROUP BY tl.timestamp
            """, countQuery = """
            SELECT COUNT(DISTINCT tl.timestamp)
            FROM TagLog tl
            JOIN tl.tag t
            JOIN t.room r
            JOIN r.category c
            WHERE c.id = :categoryId
              AND r.id = :roomId
              AND tl.timestamp BETWEEN :fromDate AND :toDate
            """)
    Page<RoomHistoricalValueDto> getHistoricalRoomMetrics(
            @Param("categoryId") Long categoryId,
            @Param("roomId") Long roomId,
            @Param("fromDate") LocalDateTime fromDate,
            @Param("toDate") LocalDateTime toDate,
            Pageable pageable);

    @Query(value = """
            SELECT
                tm.room_id,

                r.name,

                TIMESTAMP 'epoch'
                    + floor(extract(epoch FROM tl.timestamp) / (:interval * 60))
                    * (:interval * 60)
                    * INTERVAL '1 second',

                ROUND(AVG(CASE WHEN tm.parameter_id = 1 THEN tl.value END)::numeric,2),

                ROUND(AVG(CASE WHEN tm.parameter_id = 3 THEN tl.value END)::numeric,2)

            FROM tag_logs tl

            JOIN tag_master tm
                ON tl.tag_id = tm.id

            JOIN rooms r
                ON tm.room_id = r.id

            WHERE
                tm.room_id IN (:roomIds)
                AND tl.timestamp BETWEEN :fromDate AND :toDate

            GROUP BY
                tm.room_id,
                r.name,
                3

            ORDER BY
                tm.room_id,
                3
            """, nativeQuery = true)
    List<Object[]> getCommonRoomLogs(
            @Param("roomIds") List<Long> roomIds,
            @Param("interval") Integer interval,
            @Param("fromDate") LocalDateTime fromDate,
            @Param("toDate") LocalDateTime toDate);
}
