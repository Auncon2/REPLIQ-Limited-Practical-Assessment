"use client";
import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center mt-8 mx-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="py-3 px-6 text-center rounded-full transition text-yellow-800 bg-yellow-300 hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300 sm:w-max"
      >
        Prev
      </button>

      {[...Array(totalPages).keys()].map((num) => {
        const pageNum = num + 1;
        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`px-4 py-2 text-center rounded-full transition ${
              currentPage === pageNum
                ? "bg-yellow-700 text-black font-semibold text-xl"
                : "bg-gray-100 hover:bg-gray-300 text-yellow-800"
            }`}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="py-3 px-6 text-center rounded-full transition text-yellow-800 bg-yellow-300 hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300 sm:w-max"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
