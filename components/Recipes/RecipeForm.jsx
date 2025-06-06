"use client";

import Image from "next/image";
import { useState } from "react";

const steps = [
  "Basic Info",
  "Ingredients",
  "Instructions",
  "Upload Image",
  "Review",
];

const RecipeForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    ingredients: [""],
    instructions: "",
    image: null,
  });

  console.log("formData", formData);
  const handleNext = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIngredientChange = (index, value) => {
    const updated = [...formData.ingredients];
    updated[index] = value;
    setFormData({ ...formData, ingredients: updated });
  };

  const addIngredientField = () => {
    setFormData({ ...formData, ingredients: [...formData.ingredients, ""] });
  };

  const handleImageUpload = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecipe = {
      ...formData,
      id: Date.now(),
    };

    const existing = JSON.parse(localStorage.getItem("recipes")) || [];
    const updatedRecipes = [...existing, newRecipe];
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));

    alert("Recipe submitted and stored!");

    setFormData({
      name: "",
      category: "",
      ingredients: [""],
      instructions: "",
      image: null,
    });
    setCurrentStep(0);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <label className="block mb-2">Recipe Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
            />
            <label className="block mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </>
        );
      case 1:
        return (
          <>
            <label className="block mb-2">Ingredients</label>
            {formData.ingredients.map((ing, idx) => (
              <input
                key={idx}
                type="text"
                value={ing}
                onChange={(e) => handleIngredientChange(idx, e.target.value)}
                className="w-full p-2 border rounded mb-2"
                placeholder={`Ingredient ${idx + 1}`}
              />
            ))}
            <button
              type="button"
              onClick={addIngredientField}
              className="text-blue-500 underline"
            >
              + Add more
            </button>
          </>
        );
      case 2:
        return (
          <>
            <label className="block mb-2">Instructions</label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              rows={5}
              className="w-full p-2 border rounded"
            />
          </>
        );
      case 3:
        return (
          <>
            <label className="block mb-2">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full"
            />
          </>
        );
      case 4:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Review Your Recipe</h3>
            <p>
              <strong>Name:</strong> {formData.name}
            </p>
            <p>
              <strong>Category:</strong> {formData.category}
            </p>
            <p>
              <strong>Ingredients:</strong>
            </p>
            <ul className="list-disc pl-5">
              {formData.ingredients.map((ing, idx) => (
                <li key={idx}>{ing}</li>
              ))}
            </ul>
            <p>
              <strong>Instructions:</strong> {formData.instructions}
            </p>
            <p>
              <strong>Image:</strong> {formData.image?.name}
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 z-10">
      <div className="container m-auto px-6 pt-32 md:px-12 lg:pt-[4.8rem] lg:px-7">
        <div className="flex flex-row items-center  px-2 md:px-0">
          {/* Recipe Form  */}
          <div className="w-[1020px] mx-auto p-6 bg-white rounded-lg shadow ">
            <h2 className="text-center text-2xl text-yellow-800 font-bold mb-4">
              Submit Your Recipe
            </h2>
            <div className="mb-4">
              <div className="flex flex-col md:flex-row justify-between text-sm font-medium">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex-1 text-center ${
                      currentStep === index
                        ? "text-yellow-700"
                        : "text-gray-400"
                    }`}
                  >
                    {step}
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-6 mt-7">{renderStep()}</div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="px-5 py-2 bg-gray-400 text-gray-600 rounded-full "
              >
                Back
              </button>
              <form onSubmit={handleSubmit}>
                {currentStep === steps.length - 1 && (
                  <button
                    type="submit"
                    className="px-7 py-2 bg-green-500 text-white rounded-full"
                  >
                    Submit
                  </button>
                )}
              </form>
              {currentStep === steps.length - 1 ? (
                ""
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-7 py-2 bg-yellow-500 text-white rounded-full"
                >
                  Next
                </button>
              )}
            </div>
          </div>
          {/* Image */}
          <div className="hidden lg:block md:w-7/12 lg:w-6/12">
            <Image
              src="/images/home/food.webp"
              className="relative w-full"
              alt="food illustration"
              loading="lazy"
              width={850}
              height={700}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeForm;
