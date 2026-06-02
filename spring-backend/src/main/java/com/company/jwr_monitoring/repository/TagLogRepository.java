package com.company.jwr_monitoring.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.company.jwr_monitoring.entity.TagLog;

public interface TagLogRepository extends JpaRepository<TagLog, Long> {

}