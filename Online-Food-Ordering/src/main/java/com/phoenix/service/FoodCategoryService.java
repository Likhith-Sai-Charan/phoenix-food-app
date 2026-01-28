package com.phoenix.service;

import com.phoenix.model.FoodCategory;

import java.util.List;

public interface FoodCategoryService {

    public FoodCategory createFoodCategory(String name, Long userId) throws Exception;

    public List<FoodCategory> findFoodCategoryByRestaurantId(Long id) throws Exception;

    public FoodCategory findFoodCategoryById(Long id) throws Exception;
}
