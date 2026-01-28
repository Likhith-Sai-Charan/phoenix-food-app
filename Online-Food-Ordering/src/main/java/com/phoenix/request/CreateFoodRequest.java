package com.phoenix.request;

import com.phoenix.model.FoodCategory;
import com.phoenix.model.IngredientsItem;
import lombok.Data;

import java.util.List;

@Data
public class CreateFoodRequest {

    private String name;

    private String description;

    private Long price;

    private FoodCategory foodCategory;

    private List<String> images;

    private Long restaurantId;

    private boolean vegetarian;

    private boolean seasional;

    private List<IngredientsItem> ingredients;
}
