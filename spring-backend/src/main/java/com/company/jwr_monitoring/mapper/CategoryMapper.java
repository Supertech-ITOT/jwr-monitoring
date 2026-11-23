
package com.company.jwr_monitoring.mapper;

import org.springframework.stereotype.Component;

import com.company.jwr_monitoring.dto.Category.CategoryDto;
import com.company.jwr_monitoring.entity.Category;

@Component
public class CategoryMapper {

    public CategoryDto toDto(Category category) {
        if (category == null) {
            return null;
        }
        return CategoryDto.builder().id(category.getId())
                .name(category.getName())
                .build();

    }

    public Category toEntity(CategoryDto dto) {

        if (dto == null) {
            return null;
        }

        return Category.builder()
                .id(dto.id())
                .name(dto.name())
                .build();
    }
}
