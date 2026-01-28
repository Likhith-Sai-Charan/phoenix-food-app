import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";
import { Card } from "@mui/material";
import { getUsersOrders } from "../../State/Order/Action";

const Address = () => {
  const auth = useSelector((store) => store.auth);
  const order = useSelector((store) => store.order);

  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.user && jwt) {
      dispatch(getUsersOrders(jwt));
    }
  }, [auth.user, jwt, dispatch]);

  // Extract unique delivery addresses
  const userAddresses = order.orders
    ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    ?.map((order) => order.deliveryAddress)
    ?.filter(Boolean)
    ?.filter(
      (value, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.streetAddress === value.streetAddress &&
            t.city === value.city &&
            t.stateProvince === value.stateProvince &&
            t.postalCode === value.postalCode &&
            t.country === value.country
        )
    )
    .slice(0, 5);

  console.log(userAddresses);
  return (
    <div className="flex gap-5 flex-wrap justify-center pt-10">
      {userAddresses.map((address, index) => (
        <Card key={index} className="flex gap-5 w-64 p-5 items-start">
          <HomeIcon fontSize="large" />
          <div className="space-y-1 text-gray-700">
            <h1 className="font-semibold text-lg text-white">Home</h1>
            <p className="text-gray-700">
              {address.streetAddress}, {address.city}, {address.stateProvince},{" "}
              {address.postalCode}, {address.country}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Address;
