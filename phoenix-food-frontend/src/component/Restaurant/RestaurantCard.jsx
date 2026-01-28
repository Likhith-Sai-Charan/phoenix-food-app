import { Card, Chip, IconButton } from "@mui/material";
import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorite } from "../../State/Authentication/Action";
import { isPresentInFavorites } from "../config/logic";

{/*const RestaurantCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  //const { auth } = useSelector((store) => store);
  //const favorites = auth?.auth?.user?.favorites || [];

  const user = useSelector((store) => store.auth.user);
  const favorites = user?.favorites || [];

  const handleAddToFavorite = () => {
    console.log("Restaurant item:", item);
    dispatch(addToFavorite(jwt, item.id));
  };

  const handleNavigateToRestaurant = () => {
    if (item.open) {
      navigate(`/restaurant/${item.address.city}/${item.name}/${item.id}`);
    }
  };

  return (
    <Card className="w-[18rem]">
      <div
        className={`${
          item.open ? "cursor-pointer" : "cursor-not-allowed"
        } relative`}
      >
        <img
          className="w-full h-[10rem] rounded-t-md object-cover"
          src={item.images[0]}
          alt="Currently image is not available"
        />
        <Chip
          size="small"
          className="absolute top-2 left-2"
          color={item.open ? "success" : "error"}
          label={item.open ? "open" : "closed"}
        />
      </div>
      <div className="p-4 textPart lg:flex w-full justify-between">
        <div className="space-y-1">
          <p
            onClick={handleNavigateToRestaurant}
            className={`font-semibold text-lg ${
              item.open ? "cursor-pointer" : "cursor-not-allowed"
            }`}
          >
            {item.name}
          </p>
          <p className="text-gray-500 text-sm">{item.description}</p>
        </div>
        <div>
          <IconButton onClick={handleAddToFavorite}>
            {isPresentInFavorites(favorites, item) ? (
              <FavoriteIcon sx={{ color: "red" }} />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        </div>
      </div>
    </Card>
  );
};

export default RestaurantCard;
*/}

const RestaurantCard = ({ item }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const user = useSelector((store) => store.auth.user);
  const favorites = user?.favorites || [];

  // Fix mapping from backend favorites format
  const displayName = item.name || item.title || "Restaurant";
  const isOpen = item.open ?? true;  // Default true if not available
  const city = item.address?.city || "Unknown";

  const handleAddToFavorite = () => {
    dispatch(addToFavorite(jwt, item.id));
  };

  const handleNavigateToRestaurant = () => {
    if (isOpen) {
      navigate(`/restaurant/${city}/${displayName}/${item.id}`);
    }
  };

  return (
    <Card className="w-[18rem]">
      <div className={`${isOpen ? "cursor-pointer" : "cursor-not-allowed"} relative`}>
        <img
          className="w-full h-[10rem] rounded-t-md object-cover"
          src={item.images?.[0]}
          alt="Not available"
        />
        <Chip
          size="small"
          className="absolute top-2 right-2"
          color={isOpen ? "success" : "error"}
          label={isOpen ? "Open" : "Closed"}
        />
      </div>

      <div className="p-4 textPart lg:flex w-full justify-between">
        <div className="space-y-1">
          <p
            onClick={handleNavigateToRestaurant}
            className={`font-semibold text-lg ${isOpen ? "cursor-pointer" : "cursor-not-allowed"}`}
          >
            {displayName}
          </p>
          <p className="text-gray-500 text-sm">{item.description}</p>
        </div>

        <div>
          <IconButton onClick={handleAddToFavorite}>
            {isPresentInFavorites(favorites, item) ? (
              <FavoriteIcon sx={{ color: "red" }} />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        </div>
      </div>
    </Card>
  );
};

export default RestaurantCard;
