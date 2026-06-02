package com.company.jwr_monitoring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.company.jwr_monitoring.entity.TagMaster;

public interface TagMasterRepository extends JpaRepository<TagMaster, Long> {
    @Query("""
            select t
            from TagMaster t
            join fetch t.parameter
            """)
    List<TagMaster> findAllWithParameter();

}