package com.phoenix.service;

import com.phoenix.dto.RestaurantDto;
import com.phoenix.model.Address;
import com.phoenix.model.Restaurant;
import com.phoenix.model.User;
import com.phoenix.repository.AddressRepository;
import com.phoenix.repository.RestaurantRepository;
import com.phoenix.repository.UserRepository;
import com.phoenix.request.CreateRestaurantRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class RestaurantServiceImp implements RestaurantService{

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Restaurant createRestaurant(CreateRestaurantRequest createRestaurantRequest, User user) {

        Address address = addressRepository.save(createRestaurantRequest.getAddress());

        Restaurant restaurant = new Restaurant();
        restaurant.setAddress(address);
        restaurant.setContactInformation(createRestaurantRequest.getContactInformation());
        restaurant.setCuisineType(createRestaurantRequest.getCuisineType());
        restaurant.setDescription(createRestaurantRequest.getDescription());
        restaurant.setImages(createRestaurantRequest.getImages());
        restaurant.setName(createRestaurantRequest.getName());
        restaurant.setOpeningHours(createRestaurantRequest.getOpeningHours());
        restaurant.setRegistrationDate(LocalDateTime.now());
        restaurant.setOwner(user);

        return restaurantRepository.save(restaurant);
    }

    @Override
    public Restaurant updateRestaurant(Long restaurantId, CreateRestaurantRequest updatedRestaurant) throws Exception {

        Restaurant restaurant = findRestaurantById(restaurantId);

        if (updatedRestaurant.getCuisineType() != null) {
            restaurant.setCuisineType(updatedRestaurant.getCuisineType());
        }

        if (updatedRestaurant.getDescription() != null) {
            restaurant.setDescription(updatedRestaurant.getDescription());
        }

        if (updatedRestaurant.getName() != null) {
            restaurant.setName(updatedRestaurant.getName());
        }

        if (updatedRestaurant.getContactInformation() != null) {
            restaurant.setContactInformation(updatedRestaurant.getContactInformation());
        }

        if (updatedRestaurant.getImages() != null) {
            restaurant.setImages(updatedRestaurant.getImages());
        }

        if (updatedRestaurant.getOpeningHours() != null) {
            restaurant.setOpeningHours(updatedRestaurant.getOpeningHours());
        }

        if (updatedRestaurant.getAddress() != null) {
            // You can update address fields as needed.
            // Example: If you want to replace the whole address:
            restaurant.setAddress(updatedRestaurant.getAddress());
        }

        return restaurantRepository.save(restaurant);
    }

    @Override
    public void deleteRestaurant(Long restaurantId) throws Exception {
        Restaurant restaurant = findRestaurantById(restaurantId);

        restaurantRepository.delete(restaurant);
    }

    @Override
    public List<Restaurant> getAllRestaurant() {
        return restaurantRepository.findAll();
    }

    @Override
    public List<Restaurant> searchRestaurant(String keyword) {
        return restaurantRepository.findBySearchQuery(keyword);
    }

    @Override
    public Restaurant findRestaurantById(Long id) throws Exception {
        Optional<Restaurant> opt = restaurantRepository.findById(id);

        if(opt.isEmpty()){
            throw new Exception("Restaurant Not found with Id "+ id);
        }

        return opt.get();
    }

    @Override
    public Restaurant getRestaurantByUserId(Long userId) throws Exception {
        Restaurant restaurant = restaurantRepository.findByOwnerId(userId);

        if(restaurant==null){
            throw new Exception("Restaurant Not found with owner id "+userId);
        }

        return restaurant;
    }

    @Override
    public RestaurantDto addToFavorites(Long restaurantId, User user) throws Exception {
        Restaurant restaurant = findRestaurantById(restaurantId);

        RestaurantDto dto = new RestaurantDto();
        dto.setDescription(restaurant.getDescription());
        dto.setImages(restaurant.getImages());
        dto.setTitle(restaurant.getName());
        dto.setId(restaurantId);

        boolean isFavorited = false;
        List<RestaurantDto> favorites = user.getFavorites();
        for(RestaurantDto favorite : favorites){
            if(favorite.getId().equals(restaurantId)){
                isFavorited = true;
                break;
            }
        }

        if(isFavorited){
            favorites.removeIf(favorite -> favorite.getId().equals(restaurantId));
        }
        else{
            favorites.add(dto);
        }

        userRepository.save(user);

        return dto;
    }

    @Override
    public Restaurant updateRestaurantStatus(Long id) throws Exception {
        Restaurant restaurant = findRestaurantById(id);
        restaurant.setOpen(!restaurant.isOpen());
        return restaurantRepository.save(restaurant);
    }
}
