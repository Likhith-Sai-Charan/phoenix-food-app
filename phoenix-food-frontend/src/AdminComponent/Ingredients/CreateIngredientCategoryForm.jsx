import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createIngredientCategory } from "../../State/Ingredients/Action";

const CreateIngredientCategoryForm = () => {
  const { restaurant } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [formData, setFormData] = useState({
    name: "",
    restaurantId: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: formData.name,
      restaurantId: restaurant.usersRestaurant.id,
    };
    console.log(data);
    dispatch(createIngredientCategory({ data, jwt }));
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
          Create Ingredient Category
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Ingredient Category"
              variant="outlined"
              onChange={handleInputChange}
              value={formData.name}
            ></TextField>
          </div>
          <div>
            <Button variant="contained" type="submit">
              Create Ingredient Category
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateIngredientCategoryForm;
