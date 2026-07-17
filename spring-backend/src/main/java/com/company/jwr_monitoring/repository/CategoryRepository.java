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
                    COUNT(DISTINCT r.id),
                    SUM(
                        CASE
                            WHEN tm.parameter.id = 7 AND tcv.value = 1.0
                            THEN 1
                            ELSE 0
                        END
                    )
                )
                FROM Category c
                LEFT JOIN c.rooms r
                LEFT JOIN TagMaster tm ON tm.room = r
                LEFT JOIN TagCurrentValue tcv ON tcv.tag = tm
                GROUP BY c.id, c.name
                ORDER BY c.id
            """)
    List<RoomStatCardDto> getRoomStatCard();

}