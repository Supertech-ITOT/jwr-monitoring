package com.company.jwr_monitoring.repository;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.company.jwr_monitoring.dto.Dashboard.RoomHistoricalValueDto;
import com.company.jwr_monitoring.entity.TagLog;

public interface TagLogRepository extends JpaRepository<TagLog, Long> {

  @Query(value = """
      SELECT new com.company.jwr_monitoring.dto.RoomDashboard.RoomDashboardDto(
          AVG(CASE WHEN p.name = 'Temperature' THEN tl.value END),
          MAX(CASE WHEN p.name = 'RH' THEN tl.value END),
          MAX(CASE WHEN p.name = 'Energy' THEN tl.value END),
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
}