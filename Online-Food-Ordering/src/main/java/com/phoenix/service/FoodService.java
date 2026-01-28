package com.phoenix.service;

import com.phoenix.model.Food;
import com.phoenix.model.FoodCategory;
import com.phoenix.model.Restaurant;
import com.phoenix.request.CreateFoodRequest;

import java.util.List;

public interface FoodService {

    public Food createFood(CreateFoodRequest createFoodRequest, FoodCategory foodCategory, Restaurant restaurant);

    public void deleteFood(Long foodId) throws Exception;

    public List<Food> getRestaurantsFood(Long restaurantId, boolean isVegetarian, boolean isNonVegetarian, boolean isSeasional, String foodCategory);

    public List<Food> searchFood(String keyword);

    public Food findFoodById(Long foodId) throws Exception;

    public Food updateFoodAvailibilityStatus(Long foodId) throws Exception;


}
