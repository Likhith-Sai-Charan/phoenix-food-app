import { useFormik } from "formik";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import { uploadImageToCloudinary } from "../util/UploadToCloudinary";
import { useDispatch, useSelector } from "react-redux";
import { createMenuItem } from "../../State/Menu/Action";
import { getIngredientsOfRestaurant } from "../../State/Ingredients/Action";

const initialValues = {
  name: "",
  description: "",
  price: "",
  category: "",
  restaurantId: "",
  vegetarian: true,
  seasional: false,
  ingredients: [],
  images: [],
};

const CreateMenuForm = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, ingredients } = useSelector((store) => store);
  const [uploadImage, setUploadImage] = useState(false);
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const data = {
        name: values.name,
        description: values.description,
        price: values.price,
        foodCategory: {
          id: values.category.id,
          name: values.category.name,
        },
        images: values.images, // array of URLs
        restaurantId: restaurant.usersRestaurant.id,
        vegetarian: values.vegetarian,
        seasional: values.seasional,
        ingredients: values.ingredients,
      };
      //values.ingredients = values.ingredients.map((item) => item.id);
      console.log("data ---", data);
      dispatch(createMenuItem({ menu: data, jwt }));
    },
  });
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setUploadImage(true);
    const image = await uploadImageToCloudinary(file);
    formik.setFieldValue("images", [...formik.values.images, image]);
    setUploadImage(false);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  useEffect(() => {
    dispatch(
      getIngredientsOfRestaurant({
        id: restaurant.usersRestaurant.id,
        jwt,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="py-10 px-5 lg:flex items-center justify-center min-h-screen">
      <div className="lg:max-w-4xl">
        <h1 className="font-bold text-2xl text-center py-2"> Add New Menu</h1>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="flex flex-wrap -mx-2">
            <div className="w-full px-2 mb-4 flex flex-wrap gap-5">
              {" "}
              {/* if item xs={12} is not working in Grid we have to use this sx={{ gridColumn: "span 12" }}*/}
              <input
                accept="image/*"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleImageChange}
                type="file"
              />
              <label className="relative" htmlFor="fileInput">
                <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-600">
                  <AddPhotoAlternateIcon className="text-white" />
                </span>
                {uploadImage && (
                  <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center">
                    <CircularProgress />
                  </div>
                )}
              </label>
              <div className="flex flex-wrap gap-2">
                {formik.values.images.map((image, index) => (
                  <div className="relative">
                    <img
                      className="w-24 h-24 object-cover"
                      key={index}
                      src={image}
                      alt=""
                    />
                    <IconButton
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        outline: "none",
                      }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      <CloseIcon sx={{ fontSize: "1rem" }} />
                    </IconButton>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full px-2 mb-4">
              {/* if item xs={12} is not working in Grid we have to use this sx={{ gridColumn: "span 12" }}*/}
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.name}
              ></TextField>
            </div>
            <div className="w-full px-2 mb-4">
              {/* if item xs={12} is not working in Grid we have to use this sx={{ gridColumn: "span 12" }}*/}
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.description}
              ></TextField>
            </div>
            <div className="w-full lg:w-1/2 px-2 mb-4">
              {/* if item xs={12} is not working in Grid we have to use this sx={{ gridColumn: "span 12" }}*/}
              <TextField
                fullWidth
                id="price"
                name="price"
                label="Price"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.price}
              ></TextField>
            </div>
            <div className="w-full lg:w-1/2 px-2 mb-4">
              {/* if item xs={12} is not working in Grid we have to use this sx={{ gridColumn: "span 12" }}*/}
              <FormControl fullWidth>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  value={formik.values.category}
                  label="Category"
                  onChange={formik.handleChange}
                  name="category"
                >
                  {restaurant.categories?.map((item) => (
                    <MenuItem value={item}>{item.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="w-full px-2 mb-4">
              {/* if item xs={12} is not working in Grid we have to use this sx={{ gridColumn: "span 12" }}*/}
              <FormControl fullWidth>
                <InputLabel id="ingredients-label">Ingredients</InputLabel>
                <Select
                  labelId="ingredients-label"
                  id="ingredients"
                  name="ingredients"
                  multiple
                  value={formik.values.ingredients}
                  onChange={formik.handleChange}
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="Ingredients"
                    />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value.id} label={value.name} />
                      ))}
                    </Box>
                  )}
                  //MenuProps={MenuProps}
                >
                  {ingredients.ingredients?.map((item) => (
                    <MenuItem key={item.id} value={item}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="w-full lg:w-1/2 px-2 mb-4">
              {/* if item xs={12} is not working in Grid we have to use this sx={{ gridColumn: "span 12" }}*/}
              <FormControl fullWidth>
                <InputLabel id="vegetarian-label">Is Vegetarian</InputLabel>
                <Select
                  labelId="vegetarian-label"
                  id="vegetarian"
                  value={formik.values.vegetarian}
                  label="Is Vegetarian"
                  onChange={(e) => formik.setFieldValue("vegetarian", e.target.value)}
                  name="vegetarian"
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="w-full lg:w-1/2 px-2 mb-4">
              {/* if item xs={12} is not working in Grid we have to use this sx={{ gridColumn: "span 12" }}*/}
              <FormControl fullWidth>
                <InputLabel id="seasional-label">Is Seasional</InputLabel>
                <Select
                  labelId="seasional-label"
                  id="seasional"
                  value={formik.values.seasional}
                  label="Is Seasional"
                  onChange={(e) => formik.setFieldValue("seasional", e.target.value)}
                  name="seasional"
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <Button variant="contained" color="primary" type="submit">
            Add Menu Item
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateMenuForm;
