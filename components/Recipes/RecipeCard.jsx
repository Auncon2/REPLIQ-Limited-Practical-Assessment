"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const RecipeCard = ({ recipe, handleDetailsOpen }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistKey, setWishlistKey] = useState("guest_wishlist");

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    const isUserLoggedIn = !!user;
    setIsLoggedIn(isUserLoggedIn);

    const key = "global_wishlist";
    setWishlistKey(key);

    // Check Cart (only for logged-in users)
    if (isUserLoggedIn) {
      const parsedUser = JSON.parse(user);
      const userCartKey = `cart_${parsedUser.email}`;
      const currentUserCart =
        JSON.parse(localStorage.getItem(userCartKey)) || [];

      const alreadyInCart = currentUserCart.some(
        (item) => item.idMeal === recipe.idMeal
      );
      setIsInCart(alreadyInCart);
    }

    // Check Wishlist
    const storedWishlist = JSON.parse(localStorage.getItem(key)) || [];
    const alreadyInWishlist = storedWishlist.some(
      (item) => item.idMeal === recipe.idMeal
    );
    setIsInWishlist(alreadyInWishlist);
  }, [recipe.idMeal]);

  // Add to Cart Function
  const handleAddToCart = (e) => {
    e.stopPropagation();
    const user = localStorage.getItem("loggedInUser");
    if (!user) return;

    const parsedUser = JSON.parse(user);
    const userCartKey = `cart_${parsedUser.email}`;
    const currentUserCart = JSON.parse(localStorage.getItem(userCartKey)) || [];

    const alreadyInCart = currentUserCart.some(
      (item) => item.idMeal === recipe.idMeal
    );
    if (!alreadyInCart) {
      const updatedCart = [...currentUserCart, recipe];
      localStorage.setItem(userCartKey, JSON.stringify(updatedCart));
      setIsInCart(true);
      alert("Recipe added to cart!");
    }
  };

  // Wishlist Toggle Function
  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    const storedWishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];

    let updatedWishlist;
    if (isInWishlist) {
      updatedWishlist = storedWishlist.filter(
        (item) => item.idMeal !== recipe.idMeal
      );
    } else {
      updatedWishlist = [...storedWishlist, recipe];
    }

    localStorage.setItem(wishlistKey, JSON.stringify(updatedWishlist));
    setIsInWishlist(!isInWishlist);
  };

  return (
    <div
      onClick={() => handleDetailsOpen(recipe?.idMeal)}
      className="group space-y-6 border border-gray-100 rounded-3xl bg-white px-4 py-4 text-center shadow hover:cursor-pointer hover:shadow-xl transition duration-200 shadow-gray-600/10"
    >
      <Image
        className="mx-auto rounded-2xl"
        src={recipe?.strMealThumb}
        alt={recipe?.strMeal}
        loading="lazy"
        width={500}
        height={500}
      />
      <h3 className="text-2xl font-semibold text-gray-800">
        {recipe?.strMeal}
      </h3>
      <p className="text-gray-600 text-sm">
        Delicious and easy to make. Click for more details!
      </p>
      <div className="flex flex-col md:flex-row justify-center gap-4 items-center">
        {/* Add to Cart */}
        {isLoggedIn && !isInCart && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex justify-center"
          >
            <button
              onClick={handleAddToCart}
              className="mt-2 px-4 py-2 bg-yellow-300 hover:bg-yellow-400 text-yellow-900 rounded-full font-semibold text-sm transition"
            >
              Add to Cart
            </button>
          </div>
        )}
        {isLoggedIn && isInCart && (
          <p className="text-green-600 font-medium">Already in Cart</p>
        )}

        {/* Add to Wishlist */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex justify-center mt-2"
        >
          <button
            onClick={handleWishlistToggle}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              isInWishlist
                ? "bg-red-100 text-red-700 hover:bg-red-200"
                : "bg-gray-200 text-gray-700 hover:bg-yellow-300"
            }`}
          >
            {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
