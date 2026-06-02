package com.company.jwr_monitoring.repository;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.company.jwr_monitoring.dto.RoomDashboardDto;
import com.company.jwr_monitoring.entity.TagLog;

public interface TagLogRepository extends JpaRepository<TagLog, Long> {

    @Query(value = """
            SELECT new com.company.jwr_monitoring.dto.RoomDashboardDto(

                AVG(
                    CASE
                        WHEN p.id = 1
                        THEN tl.value
                    END
                ),

                AVG(
                    CASE
                        WHEN p.id = 2
                        THEN tl.value
                    END
                ),

                SUM(
                    CASE
                        WHEN p.id = 3
                        THEN tl.value
                        ELSE 0
                    END
                ),

                tl.timestamp
            )

            FROM TagLog tl
            JOIN tl.tag t
            JOIN t.room r
            JOIN r.category c
            JOIN t.parameter p

            WHERE
                (:categoryId IS NULL
                    OR c.id = :categoryId)

            AND
                (:roomId IS NULL
                    OR r.id = :roomId)

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

            GROUP BY
                tl.timestamp

            ORDER BY
                tl.timestamp DESC
            """,

            countQuery = """
                    SELECT COUNT(DISTINCT tl.timestamp)

                    FROM TagLog tl
                    JOIN tl.tag t
                    JOIN t.room r
                    JOIN r.category c

                    WHERE
                        (:categoryId IS NULL
                            OR c.id = :categoryId)

                    AND
                        (:roomId IS NULL
                            OR r.id = :roomId)

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
    Page<RoomDashboardDto> getRoomDashboard(
            @Param("categoryId") Long categoryId,
            @Param("roomId") Long roomId,
            @Param("fromDate") LocalDateTime fromDate,
            @Param("toDate") LocalDateTime toDate,
            Pageable pageable);
}