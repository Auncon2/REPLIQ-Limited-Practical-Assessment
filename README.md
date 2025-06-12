# Recipe App

# 📄 Documentation

## ✅ Features Implemented

### Authentication (Login/Signup/Logout)
Users can create an account, log in, and securely log out. Authentication state is managed using **localStorage** for session persistence.

### All Recipes Page
Displays all available recipes fetched via **RTK Query**. Users can add recipes to the cart or wishlist from this page.

### Cartlist 
Users can view all items they have added to the cart only when they are logged in. They can also remove items from the cart list.

### Wishlist
Users can view all items they have added to the wishlist, even when not logged in. They can also remove items from the cart

### Search Function
Users can search by **name**, **category**, or **ingredient**. Data fetching is handled using RTK Query, and the same endpoint is used for filtering with a dynamic URL.

### Recipe Upload Form
Multi-step recipe submission form with image preview and review. All the recipe information is stored in localStorage.

### RTK Query Integration
Converted all **Axios** API requests into **RTK Query** for simplified data fetching, caching, and performance benefits.

### Custom Pagination
Recipes are paginated manually for better UX on large datasets.

---

## 🐛 Bug Fixes

### Modal Close Button Not Working
Fixed issue where the close button on the modal was non-functional.

### Children Not Rendering in Modal
Resolved problem where modal content (`children`) was not properly rendering due to incorrect placement in the component tree.

### Navbar Not Closing on Mobile After Link Click
Fixed by programmatically unchecking the mobile nav toggle checkbox after a link is clicked.

---

## ⏱ Time Estimate

**Total time spent:** ~12-15 hours




