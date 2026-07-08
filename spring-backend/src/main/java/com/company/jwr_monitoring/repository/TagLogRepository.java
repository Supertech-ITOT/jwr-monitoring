package com.company.jwr_monitoring.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.company.jwr_monitoring.entity.TagLog;

public interface TagLogRepository extends JpaRepository<TagLog, Long> {
    @Query(value = """
            WITH bucketed_data AS (
                SELECT
                    p.name AS parameter_name,
                    tl.value,
                    TIMESTAMP 'epoch'
                        + floor(extract(epoch FROM tl.timestamp) / (:interval * 60))
                        * (:interval * 60)
                        * INTERVAL '1 second' AS bucket_time
                FROM tag_logs tl
                JOIN tag_master t ON tl.tag_id = t.id
                JOIN rooms r ON t.room_id = r.id
                JOIN categories c ON r.category_id = c.id
                JOIN parameters p ON t.parameter_id = p.id
                WHERE c.id = :categoryId
                  AND r.id = :roomId
                  AND tl.timestamp BETWEEN :fromDate AND :toDate
            )

            SELECT
                ROUND(MAX(CASE WHEN parameter_name = 'Temperature' THEN value END)::numeric, 1) AS temperature,
                ROUND(MAX(CASE WHEN parameter_name = 'RH' THEN value END)::numeric) AS rh,
                ROUND(MAX(CASE WHEN parameter_name = 'Energy' THEN value END)::numeric, 2) AS energy,
                bucket_time AS timestamp
            FROM bucketed_data
            GROUP BY bucket_time
            """, countQuery = """
            WITH bucketed_data AS (
                SELECT
                    TIMESTAMP 'epoch'
                        + floor(extract(epoch FROM tl.timestamp) / (:interval * 60))
                        * (:interval * 60)
                        * INTERVAL '1 second' AS bucket_time
                FROM tag_logs tl
                JOIN tag_master t ON tl.tag_id = t.id
                JOIN rooms r ON t.room_id = r.id
                JOIN categories c ON r.category_id = c.id
                WHERE c.id = :categoryId
                  AND r.id = :roomId
                  AND tl.timestamp BETWEEN :fromDate AND :toDate
            )
            SELECT COUNT(*)
            FROM (
                SELECT bucket_time
                FROM bucketed_data
                GROUP BY bucket_time
            )
            """, nativeQuery = true)
    Page<Object[]> getRoomHistoricalValues(
            @Param("categoryId") Long categoryId,
            @Param("roomId") Long roomId,
            @Param("interval") Integer interval,
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

                ROUND(AVG(CASE WHEN tm.parameter_id = 1 THEN tl.value END)::numeric,1),

                ROUND(AVG(CASE WHEN tm.parameter_id = 3 THEN tl.value END)::numeric)

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
