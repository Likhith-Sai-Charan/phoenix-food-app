package com.phoenix.service;

import com.phoenix.model.FoodCategory;
import com.phoenix.model.Restaurant;
import com.phoenix.repository.FoodCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FoodCategoryServiceImp implements FoodCategoryService{

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private FoodCategoryRepository foodCategoryRepository;

    @Override
    public FoodCategory createFoodCategory(String name, Long userId) throws Exception {
        Restaurant restaurant = restaurantService.getRestaurantByUserId(userId);

        FoodCategory foodCategory = new FoodCategory();

        foodCategory.setName(name);
        foodCategory.setRestaurant(restaurant);

        return foodCategoryRepository.save(foodCategory);
    }

    @Override
    public List<FoodCategory> findFoodCategoryByRestaurantId(Long id) throws Exception {
        Restaurant restaurant = restaurantService.findRestaurantById(id);
        return foodCategoryRepository.findByRestaurantId(id);
    }

    @Override
    public FoodCategory findFoodCategoryById(Long id) throws Exception {
        Optional<FoodCategory> optionalFoodCategory = foodCategoryRepository.findById(id);

        if(optionalFoodCategory.isEmpty()){
            throw new Exception("Food Category not Found");
        }

        return optionalFoodCategory.get();
    }
}
