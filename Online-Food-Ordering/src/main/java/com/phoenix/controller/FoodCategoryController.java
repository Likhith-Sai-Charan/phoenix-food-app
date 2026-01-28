package com.phoenix.controller;

import com.phoenix.model.FoodCategory;
import com.phoenix.model.User;
import com.phoenix.service.FoodCategoryService;
import com.phoenix.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class FoodCategoryController {

    @Autowired
    private FoodCategoryService foodCategoryService;

    @Autowired
    private UserService userService;

    @PostMapping("/admin/foodcategory")
    public ResponseEntity<FoodCategory> createFoodCategory(@RequestBody FoodCategory foodCategory,
                                                           @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);

        FoodCategory createdFoodCategory = foodCategoryService.createFoodCategory(foodCategory.getName(), user.getId());

        return new ResponseEntity<>(createdFoodCategory, HttpStatus.CREATED);
    }

    @GetMapping("/foodcategory/restaurant/{id}")
    public ResponseEntity<List<FoodCategory>> getRestaurantFoodCategory(@PathVariable Long id, @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);

        List<FoodCategory> foodCategories = foodCategoryService.findFoodCategoryByRestaurantId(id);

        return new ResponseEntity<>(foodCategories, HttpStatus.OK);
    }

}
