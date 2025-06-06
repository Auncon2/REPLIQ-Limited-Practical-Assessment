"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Pagination from "@/common/pagination/Pagination";

const AddtoCard = () => {
  const [cartItems, setCartItems] = useState([]);
  const [userCartKey, setUserCartKey] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
      setCartItems([]);
      return;
    }

    const key = `cart_${user.email}`;
    setUserCartKey(key);

    const storedCart = JSON.parse(localStorage.getItem(key)) || [];
    setCartItems(storedCart);
  }, []);

  const handleRemoveFromCart = (idMeal) => {
    const updatedCart = cartItems.filter((item) => item.idMeal !== idMeal);
    setCartItems(updatedCart);
    localStorage.setItem(userCartKey, JSON.stringify(updatedCart));
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cartItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(cartItems.length / itemsPerPage);

  if (cartItems.length === 0) {
    return (
      <p className="text-center mt-8 text-gray-500">
        To see your cart list login first{" "}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 p-4 mt-20">
      {currentItems.map((recipe) => (
        <div key={recipe.idMeal} className="flex justify-center">
          <div className="w-full max-w-[1000px] flex flex-col sm:flex-row items-center justify-between gap-6 border border-gray-100 rounded-3xl bg-white p-4 shadow shadow-gray-600/10 transition duration-200">
            {/* Image */}
            <Image
              className="rounded-2xl"
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              loading="lazy"
              width={100}
              height={100}
            />

            {/* Info & Button */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-4">
              <h3 className="text-lg font-semibold text-gray-800 text-center sm:text-left">
                {recipe.strMeal}
              </h3>

              <button
                onClick={() => handleRemoveFromCart(recipe.idMeal)}
                className="px-4 py-2 bg-red-100 text-red-600 rounded-full text-sm font-medium hover:bg-red-200 transition self-center sm:self-auto"
              >
                Remove from Cart
              </button>
            </div>
          </div>
        </div>
      ))}
      {/* Pagination */}
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

export default AddtoCard;
