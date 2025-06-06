import AddtoCard from "@/components/Recipes/AddtoCard";
import React from "react";

const Cart = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center">
      <div className="container mx-auto">
        {/* Cart page */}
        <AddtoCard />
      </div>
    </div>
  );
};

export default Cart;
