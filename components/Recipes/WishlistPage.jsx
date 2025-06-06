

"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Pagination from "@/common/pagination/Pagination";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userCart, setUserCart] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;


  useEffect(() => {
    const storedWishlist =
      JSON.parse(localStorage.getItem("global_wishlist")) || [];
    setWishlist(storedWishlist);

    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    setLoggedInUser(user);

    if (user) {
      const userCartKey = `cart_${user.email}`;
      const cartItems = JSON.parse(localStorage.getItem(userCartKey)) || [];
      setUserCart(cartItems);
    }
  }, []);

  const handleRemoveFromWishlist = (idMeal) => {
    const updatedWishlist = wishlist.filter((item) => item.idMeal !== idMeal);
    setWishlist(updatedWishlist);
    localStorage.setItem("global_wishlist", JSON.stringify(updatedWishlist));
  };

  const handleAddToCart = (recipe) => {
    if (!loggedInUser) return;

    const userCartKey = `cart_${loggedInUser.email}`;
    const isAlreadyInCart = userCart.some(
      (item) => item.idMeal === recipe.idMeal
    );

    if (!isAlreadyInCart) {
      const updatedCart = [...userCart, recipe];
      localStorage.setItem(userCartKey, JSON.stringify(updatedCart));
      setUserCart(updatedCart);
      alert("Added to cart!");
    }
  };

  const isInCart = (idMeal) => userCart.some((item) => item.idMeal === idMeal);

  
  // Pagination Logic
  const totalPages = Math.ceil(wishlist.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = wishlist.slice(indexOfFirstItem, indexOfLastItem);

  if (wishlist.length === 0) {
    return (
      <p className="text-center mt-8 text-gray-500">Your wishlist is empty.</p>
    );
  }

  return (
    
  <div className="w-full grid grid-cols-1 gap-6 p-4 mt-20">
  {currentItems.map((recipe) => (
    <div key={recipe.idMeal} className="flex justify-center">
      <div
        className="w-full max-w-[1000px] flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border border-gray-100 rounded-3xl bg-white p-4 shadow shadow-gray-600/10 transition duration-200"
      >
        {/* Image and title */}
        <div className="flex items-center gap-4">
          <Image
            className="rounded-2xl"
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            loading="lazy"
            width={100}
            height={100}
          />
          <h3 className="text-lg font-semibold text-gray-800">
            {recipe.strMeal}
          </h3>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-end items-center gap-3 mt-4 sm:mt-0">
          {loggedInUser && !isInCart(recipe.idMeal) && (
            <button
              onClick={() => handleAddToCart(recipe)}
              className="px-4 py-1 bg-yellow-300 text-yellow-900 rounded-full text-sm font-medium hover:bg-yellow-400 transition"
            >
              Add to Cart
            </button>
          )}

          {loggedInUser && isInCart(recipe.idMeal) && (
            <p className="text-green-600 font-medium text-sm">
              Already in Cart
            </p>
          )}

          <button
            onClick={() => handleRemoveFromWishlist(recipe.idMeal)}
            className="px-4 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium hover:bg-red-200 transition"
          >
            Remove from Wishlist
          </button>
        </div>
      </div>
    </div>
  ))}
  
      {/* Pagination  */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      )}
   
</div>

  );
};

export default WishlistPage;
