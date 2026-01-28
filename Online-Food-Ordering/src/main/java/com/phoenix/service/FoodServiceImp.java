package com.phoenix.service;

import com.phoenix.model.Food;
import com.phoenix.model.FoodCategory;
import com.phoenix.model.Restaurant;
import com.phoenix.repository.FoodRepository;
import com.phoenix.request.CreateFoodRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FoodServiceImp implements FoodService{

    @Autowired
    private FoodRepository foodRepository;

    @Override
    public Food createFood(CreateFoodRequest createFoodRequest, FoodCategory foodCategory, Restaurant restaurant) {
        Food food = new Food();

        food.setFoodCategory(foodCategory);
        food.setRestaurant(restaurant);
        food.setDescription(createFoodRequest.getDescription());
        food.setImages(createFoodRequest.getImages());
        food.setName(createFoodRequest.getName());
        food.setPrice(createFoodRequest.getPrice());
        food.setIngredients(createFoodRequest.getIngredients());
        food.setSeasonal(createFoodRequest.isSeasional());
        food.setVegetarian(createFoodRequest.isVegetarian());
        food.setCreationDate(new Date());

        Food savedFood = foodRepository.save(food);

        restaurant.getFoods().add(savedFood);

        return savedFood;
    }

    @Override
    public void deleteFood(Long foodId) throws Exception {
        Food food = findFoodById(foodId);

        food.setRestaurant(null);

        foodRepository.save(food);
    }

    @Override
    public List<Food> getRestaurantsFood(Long restaurantId, boolean isVegetarian, boolean isNonVegetarian, boolean isSeasional, String foodCategory) {

        List<Food> foods = foodRepository.findByRestaurantId(restaurantId);

        if(isVegetarian){
            foods = filterByVegetarian(foods);
        }

        if(isNonVegetarian){
            foods = filterByNonVegetarian(foods);
        }

        if(isSeasional){
            foods = filterBySeasional(foods);
        }

        if(foodCategory!=null && !foodCategory.equals("")){
            foods = filterByFoodCategory(foods, foodCategory);
        }

        return foods;
    }

    private List<Food> filterByFoodCategory(List<Food> foods, String foodCategory) {
        return foods.stream().filter(food -> {
            if(food.getFoodCategory()!=null){
                return food.getFoodCategory().getName().equals(foodCategory);
            }
            return false;
        }).collect(Collectors.toList());
    }

    private List<Food> filterBySeasional(List<Food> foods) {
        return foods.stream().filter(food -> food.isSeasonal() == true).collect(Collectors.toList());
    }

    private List<Food> filterByNonVegetarian(List<Food> foods) {
        return foods.stream().filter(food -> food.isVegetarian() == false).collect(Collectors.toList());
    }

    private List<Food> filterByVegetarian(List<Food> foods) {
        return foods.stream().filter(food -> food.isVegetarian() == true).collect(Collectors.toList());
    }

    @Override
    public List<Food> searchFood(String keyword) {
        return foodRepository.searchFood(keyword);
    }

    @Override
    public Food findFoodById(Long foodId) throws Exception {
        Optional<Food> optionalFood = foodRepository.findById(foodId);

        if(optionalFood.isEmpty()){
            throw new Exception("Food Not Exist...");
        }

        return optionalFood.get();
    }

    @Override
    public Food updateFoodAvailibilityStatus(Long foodId) throws Exception {
        Food food = findFoodById(foodId);

        food.setAvailable(!food.isAvailable());

        return foodRepository.save(food);
    }
}
