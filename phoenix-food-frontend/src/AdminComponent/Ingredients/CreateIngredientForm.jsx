import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createIngredient } from "../../State/Ingredients/Action";

const CreateIngredientForm = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, ingredients } = useSelector((store) => store);
  const [formData, setFormData] = useState({
    name: "",
    ingredientCategoryId: "",
    restaurantId: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: formData.name,
      categoryId: formData.ingredientCategoryId,
      restaurantId: restaurant.usersRestaurant.id,
    };
    console.log(data);
    dispatch(createIngredient({ data, jwt }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <div className="">
      <div className="p-5">
        <h1 className="text-gray-400 text-center text-xl pb-10">
          Create Ingredient
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Ingredient Name"
              variant="outlined"
              onChange={handleInputChange}
              value={formData.name}
            ></TextField>
          </div>
          <div>
            <FormControl fullWidth>
              <InputLabel id="category-label">Ingredient Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                value={formData.ingredientCategoryId}
                label="Ingredient Category"
                onChange={handleInputChange}
                name="ingredientCategoryId"
              >
                {ingredients.category.map((item) => (
                  <MenuItem value={item.id}>{item.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            <Button variant="contained" type="submit">
              Create Ingredient
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateIngredientForm;
