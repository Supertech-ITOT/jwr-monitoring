package com.company.jwr_monitoring.services;

import java.util.List;
import com.company.jwr_monitoring.dto.Category.CategoryDto;

public interface CategoryService {
    List<CategoryDto> getAllCategories();
}
