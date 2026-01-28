import React, { useEffect } from "react";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { getUsersOrders } from "../../State/Order/Action";

const Orders = () => {
  const auth = useSelector((store) => store.auth);
  const order = useSelector((store) => store.order);

  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersOrders(jwt));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.jwt]);

  return (
    <div className="flex items-center flex-col">
      <h1 className="text-xl text-center py-7 font-semibold">My Orders</h1>
      <div className="space-y-5 w-full lg:w-1/2">
        { order.orders?.map((order) => order.items.map((item) =>  <OrderCard order={order} item={item}/>)) 
        }
      </div>
    </div>
  );
};

export default Orders;
