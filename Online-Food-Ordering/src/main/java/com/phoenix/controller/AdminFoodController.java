package com.phoenix.controller;

import com.phoenix.model.Food;
import com.phoenix.model.Restaurant;
import com.phoenix.model.User;
import com.phoenix.request.CreateFoodRequest;
import com.phoenix.response.MessageResponse;
import com.phoenix.service.FoodService;
import com.phoenix.service.RestaurantService;
import com.phoenix.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/food")
public class AdminFoodController {

    @Autowired
    private FoodService foodService;

    @Autowired
    private UserService userService;

    @Autowired
    private RestaurantService restaurantService;

    @PostMapping()
    public ResponseEntity<Food> createFood(@RequestBody CreateFoodRequest req, @RequestHeader("Authorization") String jwt) throws Exception{
        User user = userService.findUserByJwtToken(jwt);

        Restaurant restaurant = restaurantService.findRestaurantById(req.getRestaurantId());

        Food food = foodService.createFood(req, req.getFoodCategory(), restaurant);

        return new ResponseEntity<>(food, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteFood(@PathVariable Long id, @RequestHeader("Authorization") String jwt) throws Exception{
        User user = userService.findUserByJwtToken(jwt);

        foodService.deleteFood(id);

        MessageResponse res = new MessageResponse();

        res.setMessage("Food Deleted Successfully");

        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Food> updateFoodAvailibilityStatus(@PathVariable Long id, @RequestHeader("Authorization") String jwt) throws Exception{
        User user = userService.findUserByJwtToken(jwt);

        Food food = foodService.updateFoodAvailibilityStatus(id);

        return new ResponseEntity<>(food, HttpStatus.CREATED);
    }
}
