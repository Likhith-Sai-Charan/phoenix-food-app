import React, { useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser, logOut } from "../../State/Authentication/Action";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user, loading } = useSelector((store) => store.auth);

  const jwt = localStorage.getItem("jwt");

  // Fetch user profile if logged in
  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    } else {
      navigate("/login");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || !user) {
    return (
      <div className="min-h-[80vh] flex justify-center items-center text-2xl font-semibold">
        Loading...
      </div>
    );
  }

  const handleLogout = () => {
    dispatch(logOut()); 
    navigate("/login");
  };
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center text-center">
      <div className="flex flex-col items-center justify-center">
        <AccountCircleIcon sx={{ fontSize: "9rem" }} />
        <h1 className="py-5 text-2xl font-semibold">{user.fullName || "User"}</h1>
        <p>Email: {user.email}</p>
         <p className="mt-2">Role: {user.role?.replace("ROLE_", "")}</p>
        <Button variant="contained" onClick={handleLogout} sx={{ margin: "2rem 0rem" }} color="error">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
