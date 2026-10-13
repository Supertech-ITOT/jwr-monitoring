package com.company.jwr_monitoring.services.Impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.company.jwr_monitoring.dto.Category.CategoryDto;
import com.company.jwr_monitoring.entity.Category;
import com.company.jwr_monitoring.entity.Room;
import com.company.jwr_monitoring.exception.ResourceNotFoundException;
import com.company.jwr_monitoring.mapper.CategoryMapper;
import com.company.jwr_monitoring.repository.CategoryRepository;
import com.company.jwr_monitoring.services.CategoryService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public List<CategoryDto> getAllCategories() {
        return categoryRepository.findAll().stream().map(categoryMapper::toDto).toList();
    }

    @Override
    public CategoryDto getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        return categoryMapper.toDto(category);
    }

}
