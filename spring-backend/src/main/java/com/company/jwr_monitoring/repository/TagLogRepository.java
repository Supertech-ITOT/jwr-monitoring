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
            WITH raw_data AS (
                SELECT
                    tm.room_id,
                    r.name AS room_name,
                    tl.timestamp,
                    tm.parameter_id,
                    tl.value

                FROM tag_logs tl

                JOIN tag_master tm
                    ON tl.tag_id = tm.id

                JOIN rooms r
                    ON tm.room_id = r.id

                WHERE tm.room_id IN (:roomIds)
                  AND tl.timestamp BETWEEN :fromDate AND :toDate
            ),

            bucketed_data AS (
                SELECT
                    room_id,
                    room_name,

                    TIMESTAMP 'epoch'
                        + floor(
                            extract(epoch FROM timestamp)
                            / (:interval * 60)
                        )
                        * (:interval * 60)
                        * INTERVAL '1 second' AS bucket_time,

                    parameter_id,
                    value

                FROM raw_data
            ),

            interval_data AS (
                SELECT
                    room_id,
                    room_name,
                    bucket_time,

                    ROUND(AVG(CASE WHEN parameter_id = 1 THEN value END)::numeric,1) AS temperature,
                    ROUND(AVG(CASE WHEN parameter_id = 3 THEN value END)::numeric) AS rh

                FROM bucketed_data

                GROUP BY
                    room_id,
                    room_name,
                    bucket_time
            ),

            room_stats AS (
                SELECT
                    room_id,

                    ROUND(AVG(temperature)::numeric,1) AS avg_temperature,
                    ROUND(MIN(temperature)::numeric,1) AS min_temperature,
                    ROUND(MAX(temperature)::numeric,1) AS max_temperature,

                    ROUND(AVG(rh)::numeric) AS avg_rh,
                    ROUND(MIN(rh)::numeric) AS min_rh,
                    ROUND(MAX(rh)::numeric) AS max_rh

                FROM interval_data
                GROUP BY room_id
            )

            SELECT

                id.room_id,
                id.room_name,
                id.bucket_time,

                id.temperature,
                id.rh,

                rs.avg_temperature,
                rs.min_temperature,
                rs.max_temperature,

                rs.avg_rh,
                rs.min_rh,
                rs.max_rh

            FROM interval_data id

            JOIN room_stats rs
                ON id.room_id = rs.room_id

            ORDER BY
                id.room_id,
                id.bucket_time
            """, nativeQuery = true)
    List<Object[]> getCommonRoomLogs(
            @Param("roomIds") List<Long> roomIds,
            @Param("interval") Integer interval,
            @Param("fromDate") LocalDateTime fromDate,
            @Param("toDate") LocalDateTime toDate);

    @Query(value = """
            WITH raw_data AS (
                SELECT
                    tm.room_id,
                    r.name AS room_name,
                    tl.timestamp,
                    tm.parameter_id,
                    tl.value
                FROM tag_logs tl
                JOIN tag_master tm ON tl.tag_id = tm.id
                JOIN rooms r ON tm.room_id = r.id
                WHERE tm.room_id IN (:roomIds)
                  AND tl.timestamp BETWEEN :fromDate AND :toDate
            ),

            bucketed_data AS (
                SELECT
                    room_id,
                    room_name,
                    TIMESTAMP 'epoch'
                        + floor(
                            extract(epoch FROM timestamp)
                            / (:interval * 60)
                        )
                        * (:interval * 60)
                        * INTERVAL '1 second' AS bucket_time,
                    parameter_id,
                    value
                FROM raw_data
            ),

            interval_data AS (
                SELECT
                    room_id,
                    room_name,
                    bucket_time,

                    AVG(CASE WHEN parameter_id = 2 THEN value END) AS energy,
                    AVG(CASE WHEN parameter_id = 4 THEN value END) AS current,
                    AVG(CASE WHEN parameter_id = 5 THEN value END) AS voltage,
                    AVG(CASE WHEN parameter_id = 6 THEN value END) AS frequency

                FROM bucketed_data
                GROUP BY room_id, room_name, bucket_time
            ),

            room_stats AS (
                SELECT
                    room_id,

                    ROUND(AVG(energy)::numeric, 2) AS avg_energy,
                    ROUND(MIN(energy)::numeric, 2) AS min_energy,
                    ROUND(MAX(energy)::numeric, 2) AS max_energy,

                    ROUND(AVG(current)::numeric, 2) AS avg_current,
                    ROUND(MIN(current)::numeric, 2) AS min_current,
                    ROUND(MAX(current)::numeric, 2) AS max_current,

                    ROUND(AVG(voltage)::numeric, 2) AS avg_voltage,
                    ROUND(MIN(voltage)::numeric, 2) AS min_voltage,
                    ROUND(MAX(voltage)::numeric, 2) AS max_voltage,

                    ROUND(AVG(frequency)::numeric, 2) AS avg_frequency,
                    ROUND(MIN(frequency)::numeric, 2) AS min_frequency,
                    ROUND(MAX(frequency)::numeric, 2) AS max_frequency

                FROM interval_data
                GROUP BY room_id
            )

            SELECT
                id.room_id,
                id.room_name,
                id.bucket_time,

                ROUND(id.energy::numeric, 2),
                ROUND(id.current::numeric, 2),
                ROUND(id.voltage::numeric, 2),
                ROUND(id.frequency::numeric, 2),

                rs.avg_energy,
                rs.min_energy,
                rs.max_energy,

                rs.avg_current,
                rs.min_current,
                rs.max_current,

                rs.avg_voltage,
                rs.min_voltage,
                rs.max_voltage,

                rs.avg_frequency,
                rs.min_frequency,
                rs.max_frequency

            FROM interval_data id
            JOIN room_stats rs
                ON id.room_id = rs.room_id

            ORDER BY id.room_id, id.bucket_time
            """, nativeQuery = true)
    List<Object[]> getEnergyRoomLogs(
            @Param("roomIds") List<Long> roomIds,
            @Param("interval") Integer interval,
            @Param("fromDate") LocalDateTime fromDate,
            @Param("toDate") LocalDateTime toDate);
}
