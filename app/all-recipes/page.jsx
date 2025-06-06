import { AllRecipesPage } from "@/components/Recipes/AllRecipesPage";
import React from "react";

const AllRecipes = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center">
      <div className="container mx-auto">
        {/* <h1 className="text-4xl">This is the all recipes page</h1> */}
        <AllRecipesPage />
      </div>
    </div>
  );
};

export default AllRecipes;
