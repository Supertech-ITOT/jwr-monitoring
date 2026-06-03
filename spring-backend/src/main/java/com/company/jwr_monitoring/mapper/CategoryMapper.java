package com.company.jwr_monitoring.mapper;

import org.springframework.stereotype.Component;

import com.company.jwr_monitoring.dto.Category.CategoryDto;
import com.company.jwr_monitoring.entity.Category;

@Component
public class CategoryMapper {
    public CategoryDto toDto(Category category) {
        return new CategoryDto(
                category.getId(),
                category.getName());
    }

    public Category toEntity(CategoryDto dto) {
        return Category.builder()
                .id(dto.id())
                .name(dto.name()).build();

    }

}
