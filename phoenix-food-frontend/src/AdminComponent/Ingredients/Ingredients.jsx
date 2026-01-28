import React from "react";
import IngredientTable from "./IngredientTable";
import { Grid } from "@mui/material";
import IngredientCategoryTable from "./IngredientCategoryTable";

const Ingredients = () => {
  return (
    <div className="px-2">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-8">
          <IngredientTable />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <IngredientCategoryTable />
        </div>
      </div>
    </div>
  );
};

export default Ingredients;
