package com.company.jwr_monitoring.services;

import com.company.jwr_monitoring.dto.CategoryDto;
import com.company.jwr_monitoring.mapper.CategoryMapper;
import com.company.jwr_monitoring.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public List<CategoryDto> getAllCategories() {

        return categoryRepository.findAll()
                .stream()
                .map(categoryMapper::toDto)
                .toList();
    }
}