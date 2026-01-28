package com.phoenix.repository;

import com.phoenix.model.FoodCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FoodCategoryRepository extends JpaRepository<FoodCategory, Long> {

    public List<FoodCategory> findByRestaurantId(Long id);

}
