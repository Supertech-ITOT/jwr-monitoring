package com.company.jwr_monitoring.controller;

import com.company.jwr_monitoring.dto.Category.CategoryDto;
import com.company.jwr_monitoring.services.CategoryService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public List<CategoryDto> getAllCategories() {

        return categoryService.getAllCategories();
    }
}
