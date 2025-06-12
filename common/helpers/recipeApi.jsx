import { baseApi } from "@/Auth/baseApi";

export const recipeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTopRecipes: build.query({
      // query: () => `/filter.php?a=American`,
      query: (filters) => {
        if (filters?.name) return `/search.php?s=${filters.name}`;
        if (filters?.category) return `/filter.php?c=${filters.category}`;
        if (filters?.ingredient) return `/filter.php?i=${filters.ingredient}`;

        return `/filter.php?a=American`; // default
      },
      transformResponse: (response) => response.meals || [],
    }),

    searchRecipesByName: build.query({
      query: (query) => ({
        url: `/search.php`,
        params: { s: query },
      }),
      transformResponse: (response) => response.meals || [],
    }),

    searchRecipesByIngredient: build.query({
      query: (ingredient) => ({
        url: `/filter.php`,
        params: { i: ingredient },
      }),
      transformResponse: (response) => response.meals || [],
    }),

    getRecipeDetails: build.query({
      query: (id) => ({
        url: `/lookup.php?i=${id}`,
        // params: { i: id },
      }),
      transformResponse: (response) =>
        response.meals ? response.meals[0] : null,
    }),

    getCategories: build.query({
      query: () => `/categories.php`,
      transformResponse: (response) => response.categories || [],
    }),

    filterByCategory: build.query({
      query: (category) => ({
        url: `/filter.php`,
        params: { c: category },
      }),
      transformResponse: (response) => response.meals || [],
    }),

    filterByArea: build.query({
      query: (area) => ({
        url: `/filter.php`,
        params: { a: area },
      }),
      transformResponse: (response) => response.meals || [],
    }),
    allMealCategories: build.query({
      query: () => ({
        url: `/categories.php`,
      }),
      transformResponse: (response) => response.meals || [],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTopRecipesQuery,
  useSearchRecipesByNameQuery,
  useSearchRecipesByIngredientQuery,
  useGetRecipeDetailsQuery,
  useGetCategoriesQuery,
  useFilterByCategoryQuery,
  useFilterByAreaQuery,
  useAllMealCategoriesQuery,
} = recipeApi;
