package com.company.jwr_monitoring.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.company.jwr_monitoring.entity.TagMaster;

public interface TagMasterRepository extends JpaRepository<TagMaster, Long> {
        @Query("""
                        select t
                        from TagMaster t
                        join fetch t.parameter
                        """)
        List<TagMaster> findAllWithParameter();

        @Query("""
                        SELECT t.id
                        FROM TagMaster t
                        WHERE t.room.id IN :roomIds
                        """)
        List<Long> getTagIdByRoom(
                        @Param("roomIds") List<Long> roomIds);

        @Query("""
                            SELECT t.id
                            FROM TagMaster t
                            JOIN t.room r
                            JOIN r.category c
                            WHERE c.id = :categoryId
                              AND t.parameter.id = :parameterId
                        """)
        List<Long> getTagIdByCategoryIdAndParameterId(
                        @Param("categoryId") Long categoryId,
                        @Param("parameterId") Long parameterId);

        @Query("""
                        SELECT t.id
                        FROM TagMaster t
                        JOIN t.room r
                        JOIN r.category c
                        WHERE c.id IN :categoryIds
                          AND t.parameter.id = :parameterId
                        """)
        List<Long> getTagIdsByCategoryIdsAndParameterId(
                        @Param("categoryIds") List<Long> categoryIds,
                        @Param("parameterId") Long parameterId);

}