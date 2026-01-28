package com.phoenix.service;

import com.phoenix.model.IngredientCategory;
import com.phoenix.model.IngredientsItem;
import com.phoenix.model.Restaurant;
import com.phoenix.repository.IngredientCategoryRepository;
import com.phoenix.repository.IngredientItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IngredientsServiceImp implements IngredientsService{

    @Autowired
    private IngredientItemRepository ingredientItemRepository;

    @Autowired
    private IngredientCategoryRepository ingredientCategoryRepository;

    @Autowired
    private RestaurantService restaurantService;

    @Override
    public IngredientCategory createIngredientCategory(String name, Long restaurantId) throws Exception {
        Restaurant restaurant = restaurantService.findRestaurantById(restaurantId);

        IngredientCategory ingredientCategory = new IngredientCategory();

        ingredientCategory.setRestaurant(restaurant);
        ingredientCategory.setName(name);

        return ingredientCategoryRepository.save(ingredientCategory);
    }

    @Override
    public IngredientCategory findIngredientCategoryById(Long id) throws Exception {
        Optional<IngredientCategory> optionalIngredientCategory = ingredientCategoryRepository.findById(id);

        if(optionalIngredientCategory.isEmpty()){
            throw new Exception("Ingredient Category Not Found");
        }

        return optionalIngredientCategory.get();
    }

    @Override
    public List<IngredientCategory> findIngredientCategoryByRestaurantId(Long id) throws Exception {
        restaurantService.findRestaurantById(id);

        return ingredientCategoryRepository.findByRestaurantId(id);
    }

    @Override
    public IngredientsItem createIngredientItem(Long restaurantId, String ingredientName, Long ingredientCategoryId) throws Exception {
        Restaurant restaurant = restaurantService.findRestaurantById(restaurantId);
        IngredientCategory ingredientCategory = findIngredientCategoryById(ingredientCategoryId);

        IngredientsItem item = new IngredientsItem();

        item.setName(ingredientName);
        item.setRestaurant(restaurant);
        item.setCategory(ingredientCategory);

        IngredientsItem ingredient = ingredientItemRepository.save(item);
        ingredientCategory.getIngredients().add(ingredient);

        return ingredient;
    }

    @Override
    public List<IngredientsItem> findRestaurantsIngredients(Long restaurantId) {
        return ingredientItemRepository.findByRestaurantId(restaurantId);
    }

    @Override
    public IngredientsItem updateStock(Long id) throws Exception {
        Optional<IngredientsItem> optionalIngredientsItem = ingredientItemRepository.findById(id);

        if(optionalIngredientsItem.isEmpty()){
            throw new Exception("Ingredient Not Found");
        }

        IngredientsItem ingredientsItem = optionalIngredientsItem.get();
        ingredientsItem.setInStock(!ingredientsItem.isInStock());

        return ingredientItemRepository.save(ingredientsItem);
    }
}
