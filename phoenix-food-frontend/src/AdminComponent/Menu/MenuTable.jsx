import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import React, { useEffect } from "react";
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFoodAction,
  getMenuItemsByRestaurantId,
  updateMenuItemsAvailability,
} from "../../State/Menu/Action";

const MenuTable = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, menu } = useSelector((store) => store);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      getMenuItemsByRestaurantId({
        jwt,
        restaurantId: restaurant.usersRestaurant.id,
        vegetarian: false,
        nonvegetarian: false,
        seasonal: false,
        foodCategory: "",
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteFood = (foodId) => {
    dispatch(deleteFoodAction({ foodId, jwt }));
  };

  const handleUpdateFoodAvailablity = (foodId) => {
    dispatch(updateMenuItemsAvailability({ foodId, jwt }));
  };

  return (
    <div>
      <Box>
        <Card className="mt-1">
          <CardHeader
            action={
              <IconButton
                onClick={() => navigate("/admin/restaurants/add-menu")}
                aria-label="settings"
              >
                <CreateIcon />
              </IconButton>
            }
            title={"All Menu Items"}
            sx={{ pt: 2, alignItems: "center" }}
          />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Image</TableCell>
                  <TableCell align="right">Title</TableCell>
                  <TableCell align="right">Ingredients</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Availability</TableCell>
                  <TableCell align="right">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {menu.menuItems.map((item) => (
                  <TableRow
                    key={item.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Avatar src={item.images[0]}></Avatar>
                    </TableCell>
                    <TableCell align="right">{item.name}</TableCell>
                    <TableCell align="right">
                      {item.ingredients.map((ingredient) => (
                        <Chip label={ingredient.name} />
                      ))}
                    </TableCell>
                    <TableCell align="right">₹{item.price}</TableCell>
                    <TableCell align="right">
                      <Button
                        color={item.available ? "success" : "primary"}
                        onClick={() => handleUpdateFoodAvailablity(item.id)}
                      >
                        {item.available ? "In_Stock" : "Out_Of_Stock"}
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="primary"
                        onClick={() => handleDeleteFood(item.id)}
                      >
                        <Delete />
                      </IconButton>{" "}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Box>
    </div>
  );
};

export default MenuTable;
