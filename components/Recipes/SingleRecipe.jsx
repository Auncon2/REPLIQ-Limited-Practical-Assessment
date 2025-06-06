

"use client";

import { useGetRecipeDetailsQuery } from "@/common/helpers/recipeApi";
import Image from "next/image";
import React from "react";

const SingleRecipe = ({ id, setIsOpen }) => {
  const {
    data: recipe,
    isLoading,
    error,
  } = useGetRecipeDetailsQuery(id);

  console.log("recipe", recipe, "id", id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching recipe.</div>;
  if (!recipe) return <div>No recipe found.</div>;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-end">
        <button
          onClick={() => setIsOpen(false)}
          className="text-red-500 font-semibold hover:underline"
        >
          Close
        </button>
      </div>
      <div>
        <Image
          src={recipe?.strMealThumb}
          width={500}
          height={500}
          alt={recipe?.strMeal || "Recipe Image"}
          className="rounded"
        />
      </div>
      <h2 className="text-2xl font-semibold">{recipe?.strMeal}</h2>
      <p className="text-gray-700">
        {recipe?.strInstructions?.slice(0, 300)}...
      </p>
    </div>
  );
};

export default SingleRecipe;
