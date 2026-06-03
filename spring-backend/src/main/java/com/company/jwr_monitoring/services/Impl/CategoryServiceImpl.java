package com.company.jwr_monitoring.services.Impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.company.jwr_monitoring.dto.Category.CategoryDto;
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
}
