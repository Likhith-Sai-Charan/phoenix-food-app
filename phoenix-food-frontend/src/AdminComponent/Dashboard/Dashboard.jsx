import React from "react";
import MenuTable from "../Menu/MenuTable";
import OrderTable from "../Orders/OrderTable";

const RestaurantDashboard = () => {
  return (
    <div className="px-2">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-6">
          <MenuTable />
        </div>
        <div className="col-span-12 lg:col-span-6">
          <OrderTable />
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;
