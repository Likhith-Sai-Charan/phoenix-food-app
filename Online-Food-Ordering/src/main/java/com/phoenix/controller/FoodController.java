package com.phoenix.controller;

import com.phoenix.model.Food;
import com.phoenix.model.Restaurant;
import com.phoenix.model.User;
import com.phoenix.request.CreateFoodRequest;
import com.phoenix.service.FoodService;
import com.phoenix.service.RestaurantService;
import com.phoenix.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/food")
public class FoodController {

    @Autowired
    private FoodService foodService;

    @Autowired
    private UserService userService;

    @Autowired
    private RestaurantService restaurantService;

    @GetMapping("/search")
    public ResponseEntity<List<Food>> searchFood(@RequestHeader("Authorization") String jwt,
                                                 @RequestParam String name) throws Exception{
        User user = userService.findUserByJwtToken(jwt);

        List<Food> foods = foodService.searchFood(name);

        return new ResponseEntity<>(foods, HttpStatus.OK);
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<Food>> getRestaurantFood(@RequestHeader("Authorization") String jwt,
                                                        @RequestParam(required = false) boolean vegetarian,
                                                        @RequestParam(required = false) boolean seasonal,
                                                        @RequestParam(required = false) boolean nonvegetarian,
                                                        @RequestParam(required = false) String food_category,
                                                        @PathVariable Long restaurantId) throws Exception{
        User user = userService.findUserByJwtToken(jwt);

        List<Food> foods = foodService.getRestaurantsFood(restaurantId, vegetarian, nonvegetarian, seasonal, food_category);

        return new ResponseEntity<>(foods, HttpStatus.OK);
    }
}
