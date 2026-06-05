package com.company.jwr_monitoring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.company.jwr_monitoring.dto.Dashboard.RoomStatCardDto;
import com.company.jwr_monitoring.entity.Category;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByName(String name);

    @Query("""
                SELECT new com.company.jwr_monitoring.dto.Dashboard.RoomStatCardDto(
                    c.id,
                    c.name,
                    COUNT(r)
                )
                FROM Category c
                LEFT JOIN c.rooms r
                GROUP BY c.id, c.name
                ORDER BY c.id
            """)
    List<RoomStatCardDto> getRoomStatCard();

}