package com.company.jwr_monitoring.repository;

import com.company.jwr_monitoring.entity.Room;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {

        List<Room> findByCategoryId(Long categoryId);

        @Query("SELECT r.id FROM Room r WHERE r.category.id = :categoryId ORDER BY r.name")
        List<Long> findIdsByCategory(Long categoryId);

        Page<Room> findByCategoryId(Long categoryId, Pageable pageable);

        @Query("""
                            SELECT COUNT(DISTINCT r.id)
                            FROM Room r
                            JOIN TagMaster tm ON tm.room = r
                            JOIN TagCurrentValue tcv ON tcv.tag = tm
                            WHERE tm.parameter.id = 7
                              AND tcv.value = 1.0
                        """)
        Long countRunningRooms();
}