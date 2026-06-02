package com.company.jwr_monitoring.repository;

import com.company.jwr_monitoring.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomRepository
        extends JpaRepository<Room, Long> {

    List<Room> findByCategoryId(
            Long categoryId);
}