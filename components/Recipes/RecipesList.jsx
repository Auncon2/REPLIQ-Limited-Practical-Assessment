"use client";
import React, { useState, useEffect } from "react";

import RecipeCard from "./RecipeCard";
import Modal from "../Modal";
import SingleRecipe from "./SingleRecipe";
import {
  useGetTopRecipesQuery,
  useSearchRecipesByNameQuery,
} from "@/common/helpers/recipeApi";
import Pagination from "@/common/pagination/Pagination";

const RecipesList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [openDetails, setOpenDetails] = useState(false);
  const [recipeId, setRecipeId] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: topRecipes,
    isLoading: topLoading,
    error: topError,
  } = useGetTopRecipesQuery();

  const {
    data: searchedRecipes,
    refetch: refetchSearch,
    isFetching: searchLoading,
    error: searchError,
  } = useSearchRecipesByNameQuery(searchQuery, {
    skip: !searchQuery,
  });

  const recipes = searchQuery ? searchedRecipes : topRecipes;



  const handleSearch = () => {
    if (searchInput.trim() !== "") {
      setSearchQuery(searchInput);
      refetchSearch();
    }
  };

  const handleDetailsOpen = (id) => {
    setOpenDetails(true);
    setRecipeId(id);
  };

  if (topLoading || searchLoading) return <div>Loading recipes...</div>;
  if (topError || searchError)
    return (
      <div>
        Error loading recipes:
        {topError?.message || searchError?.message || "Unknown error"}
      </div>
    );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRecipes = recipes?.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil((recipes?.length || 0) / itemsPerPage);
  return (
    <div className="bg-gray-50 py-10">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold">Top Recipes</h1>

        {/* Search form */}
        <div>
          <form onSubmit={(e) => e.preventDefault()} className="w-full mt-12">
            <div className="relative flex p-1 rounded-full bg-white border border-yellow-200 shadow-md md:p-2">
              <input
                placeholder="Your favorite food"
                className="w-full p-4 rounded-full outline-none bg-transparent"
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button
                onClick={handleSearch}
                type="button"
                title="Start buying"
                className="ml-auto py-3 px-6 rounded-full text-center transition bg-gradient-to-b from-yellow-200 to-yellow-300 hover:to-red-300 active:from-yellow-400 focus:from-red-400 md:px-12"
              >
                <span className="hidden text-yellow-900 font-semibold md:block">
                  Search
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 mx-auto text-yellow-900 md:hidden"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398l3.85 3.85a1 1 0 1 0 1.415-1.414l-3.85-3.85zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </button>
            </div>
          </form>
        </div>

        <div className="relative py-16">
          <div className="container relative m-auto px-6 text-gray-500 md:px-12">
            <div className="grid gap-6 md:mx-auto md:w-8/12 lg:w-full lg:grid-cols-3">
              {paginatedRecipes?.map((recipe) => (
                <RecipeCard
                  key={recipe.idMeal}
                  recipe={recipe}
                  handleDetailsOpen={handleDetailsOpen}
                />
              ))}
            </div>
          </div>
        </div>
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      {/* Modal */}
      <Modal isOpen={openDetails} setIsOpen={setOpenDetails}>
        { recipeId &&   <SingleRecipe id={recipeId} setIsOpen={setOpenDetails} />}
      
      </Modal>
    </div>
  );
};

export default RecipesList;




