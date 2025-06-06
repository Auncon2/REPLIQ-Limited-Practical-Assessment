"use client";
import React, { useState } from "react";
import RecipeCard from "./RecipeCard";
import Modal from "../Modal";
import SingleRecipe from "./SingleRecipe";
import { useGetTopRecipesQuery } from "@/common/helpers/recipeApi";
import Pagination from "@/common/pagination/Pagination";

export const AllRecipesPage = () => {
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 6;

  const { data: recipes, isLoading, error } = useGetTopRecipesQuery();

  const handleDetailsOpen = (id) => {
    setSelectedId(id);
    setOpenDetails(true);
  };
  console.log("selectedId", selectedId);
  if (isLoading) return <div className="p-6">Loading recipes...</div>;
  if (error)
    return <div className="p-6 text-red-500">Error: {error.message}</div>;

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  return (
    <div className="bg-gray-50 min-h-screen py-10 mt-20">
      <div className="container mx-auto px-4">
        {/* <h1 className="text-3xl font-bold mb-8">All Recipes</h1> */}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {currentRecipes?.map((recipe) => (
            <RecipeCard
              key={recipe.idMeal}
              recipe={recipe}
              handleDetailsOpen={handleDetailsOpen}
            />
          ))}
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: "smooth" }); // Optional scroll to top
            }}
          />
        )}
      </div>

      {/* Recipe Detail Modal */}
      <Modal isOpen={openDetails} setIsOpen={setOpenDetails}>
        {selectedId && (
          <SingleRecipe id={Number(selectedId)} setIsOpen={setOpenDetails} />
        )}
      </Modal>
    </div>
  );
};
