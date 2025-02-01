# **Recipe Management System**

## **Project Overview**
The **Recipe Management System** is a web application that allows users to **store, manage, and mark their favorite recipes**. It provides functionality for user authentication, recipe - create, update, delete and the ability to mark recipes as favorites. The system uses **Node.js, Express.js, PostgreSQL**, and follows a structured database schema.



## User Management API's


- **`POST /user/register`** - Registers a new user using `username`, `email`, and `password`.
-  **Request Body Example:**
    ```json
    {
      "username": "sumanth",
      "email": "sumanth@gmail.com",
      "password": "password123"
    }
    ```
- **Success Response:**
  ```json
  {
    "message": "User registered successfully",
  }
    ```
- **Error Response:**
  ```json
  {
    "message": "User already registered, please login",
  }
    ```
- **`POST /user/login`**     -  for user login using `email`,`password`and Authenticate user and return JWT

-  **Request Body Example:**
    ```json
    {
      "email": "sumanth@gmail.com",
      "password": "password123"
    }
    ```
- **Success Response:**
  ```json
  {
    "message": "login successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MX0.     _7bD3u4v9FwFJHX2xoXikTdlOmoji6J6-p6G5D9XnGo"
  }
    ```
- **Error Response:**
  ```json
  {
    "message": "Unauthorized access",
  }
    ```


## Recipe Management API's

- **`POST /recipe/add`**  -  adds an recipe for specific user it contains {`title`,`description`,`ingredients`,`steps`,`user_id`}
-  **Request Body Example:**
 ```json
    {
    "title" : "Noodles",
    "ingredients" : "Noodles, water, salt, oil, vegetables (carrot, capsicum, cabbage), soy sauce, vinegar, chili sauce, garlic, ginger, spring onions",
    "description" : "A quick and delicious stir-fried noodle dish with vegetables and flavorful sauces",
    "steps" :
    [
        "Boil water in a pan, add salt and a few drops of oil.",
        "Add noodles and cook until soft, then drain and rinse with cold water.",
        "Heat oil in a pan, add chopped garlic, ginger, and sauté.",
        "Add sliced vegetables and stir-fry on high heat.",
        "Add cooked noodles along with soy sauce, vinegar, and chili sauce.",
        "Mix well and stir-fry for 2-3 minutes.",
        "Garnish with spring onions and serve hot."
    ]
    }
```
- **Success Response:**
  ```json
  {
    "message": "Recipe added sucessfully"
  }
  ```
- **Error Response:**
  ```json
  {
    "message": "Recipe already present in list",
  }
  ```


- **`GET /recipe/all`**  -  get all recipes of specific user
- **Success Response:**
 ```json
  {
    "message": {
    "recipes": [
    {
      "recipeId": 10,
      "title": "Caramel Popcorn",
      "description": "Sweet and crunchy caramel-coated popcorn that's perfect for snacking.",
      "ingredients": "Popcorn kernels, butter, brown sugar, corn syrup, baking soda, vanilla extract, salt",
      "steps": [
        "Pop the popcorn kernels in a large pot or popcorn maker and set aside.",
        "In a saucepan, melt butter over medium heat.",
        "Add brown sugar, corn syrup, and salt to the melted butter."
      ],
      "user_id": 1
    }
  ]
}
}
```
- **Error Response:**
  ```json
  {
    "message": "No recipes found for the user",
  }
  ```



- **`PATCH /recipe/update/:id`**  -  specific user will update specific recipe through recipe_id

-  **Request Body Example:**

    ```json
    {
      "title": "Caramel Popcorn (Updated)",
      "description": "Sweet, crunchy, and now with extra flavor!",
      "ingredients": "Popcorn kernels, butter, brown sugar, corn syrup, baking soda, vanilla extract, salt, extra flavoring",
      "steps": [
        "Pop the popcorn kernels in a large pot or popcorn maker.",
        "Melt butter, then add brown sugar and corn syrup to boil.",
        "Stir in baking soda and vanilla extract.",
        "Add extra flavoring and mix well.",
        "Coat popcorn with the caramel mixture and bake."
      ]
    }
    ```
- **Success Response:**
  ```json
  {
    "message": "Recipe updated successfully"
  }
  ```
- **Error Response:**
  ```json
  {
    "message": "Recipe Not found",
  }
  ```

- **`DELETE /recipe/delete/:id`**  -  specific user will delete specific recipe through recipe_id

- **Success Response:**
  ```json
  {
    "message": "Recipe deleted successfully"
  }
  ```
- **Error Response:**
  ```json
  {
    "message": "Recipe Not found",
  }
  ```
- **`POST /recipe/favorite/:id`**  -  Add an specific recipe in favorite list

- **Success Response:**
  ```json
  {
    "message": "Recipe Added to Favorite List"
  }
  ```
- **Error Response:**
  ```json
  {
    "message": "Recipe Not found",
  }
  ```

- **`GET /recipe/favorite/all`**  -  get all recipes which were present specific userID

- **Success Response:**
  ```json
  {
    "message": {
    "favoriteRecipes": [
    {
      "recipeId": 10,
      "title": "Caramel Popcorn",
      "ingredients": "Popcorn kernels, butter, brown sugar, corn syrup, baking soda, vanilla extract, salt",
      "description": "Sweet and crunchy caramel-coated popcorn that's perfect for snacking.",
      "steps": [
        "Pop the popcorn kernels in a large pot or popcorn maker and set aside.",
        "In a saucepan, melt butter over medium heat.",
        "Add brown sugar, corn syrup, and salt to the melted butter. Stir continuously until it comes to a boil.",
        "Let the mixture boil for 4-5 minutes without stirring.",
        "Remove from heat and stir in baking soda and vanilla extract. The mixture will bubble up.",
        "Pour the caramel over the popped popcorn and toss gently to coat evenly.",
        "Spread the caramel-coated popcorn on a baking sheet and bake at 250°F (120°C) for 45 minutes, stirring every 15 minutes.",
        "Remove from the oven, let it cool completely, and break into pieces. Serve and enjoy!"
      ],
      "user_id": 1
    }
  ]
    }
  }
  ```
- **Error Response:**
  ```json
  {
    "message": "No favorite recipes found for the user",
  }
  ```


- **`DELETE /recipe/unfavorite/:id`**  -  Delete an specific recipe in favorite list

- **Success Response:**
  ```json
  {
    "message": "Recipe Deleted from Favorite List"
  }
  ```
- **Error Response:**
  ```json
  {
    "message": "Recipe Not found",
  }
  ```

## **Features**
### **1. User Authentication**
- Users can **register and log in** securely.
- Passwords are **hashed** before storing in the database.
- JWT-based authentication ensures secure access to protected routes.

### **2. Recipe Management**
- Users can **create, update, delete, and view** their recipes.
- Recipes contain **title, ingredients, description, and preparation steps**.
- Recipes are stored in a **PostgreSQL database**.

### **3. Favorite Recipes**
- Users can mark recipes as **favorites**.
- The system maintains a **separate table (`favorite_recipes`)** to store favorite recipes.
- Users can view their favorite recipes.

# SAMPLE  RECIPE  EXAMPLES

# sample - 1:
```json

{
    "title" : "Noodles",
    "ingredients" : "Noodles, water, salt, oil, vegetables (carrot, capsicum, cabbage), soy sauce, vinegar, chili sauce, garlic, ginger, spring onions",
    "description" : "A quick and delicious stir-fried noodle dish with vegetables and flavorful sauces",
    "steps" :
    [
        "Boil water in a pan, add salt and a few drops of oil.",
        "Add noodles and cook until soft, then drain and rinse with cold water.",
        "Heat oil in a pan, add chopped garlic, ginger, and sauté.",
        "Add sliced vegetables and stir-fry on high heat.",
        "Add cooked noodles along with soy sauce, vinegar, and chili sauce.",
        "Mix well and stir-fry for 2-3 minutes.",
        "Garnish with spring onions and serve hot."
    ]
}
```
# sample - 2:
```json
{
    "title" : "Caramel Popcorn",
    "ingredients" : "Popcorn kernels, butter, brown sugar, corn syrup, baking soda, vanilla extract, salt",
    "description" : "Sweet and crunchy caramel-coated popcorn that's perfect for snacking.",
    "steps" : [
        "Pop the popcorn kernels in a large pot or popcorn maker and set aside.",
        "In a saucepan, melt butter over medium heat.",
        "Add brown sugar, corn syrup, and salt to the melted butter. Stir continuously until it comes to a boil.",
        "Let the mixture boil for 4-5 minutes without stirring.",
        "Remove from heat and stir in baking soda and vanilla extract. The mixture will bubble up.",
        "Pour the caramel over the popped popcorn and toss gently to coat evenly.",
        "Spread the caramel-coated popcorn on a baking sheet and bake at 250°F (120°C) for 45 minutes, stirring every 15 minutes.",
        "Remove from the oven, let it cool completely, and break into pieces. Serve and enjoy!"
    ]
}
```



## **Tech Stack**
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Token)
- **Environment Management**: dotenv




## **Database Schema**
### **Users Table**
Stores user details.
```sql
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
### **Users Table**
```sql
CREATE TABLE IF NOT EXISTS recipes (
    recipeId SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    ingredients TEXT NOT NULL,
    description TEXT NOT NULL,
    steps TEXT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
### Favorite Recipes Table

```sql
CREATE TABLE IF NOT EXISTS favorite_recipes (
    favorite_id SERIAL PRIMARY KEY,
    recipeId INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

# Backend Project Structure
```bash
backend/
│── model/
│   ├── table.js          # Defines database schema
│   ├── index.js          # Manages database interactions
│── routes/
│   ├── user.js           # Handles user authentication routes
│   ├── recipe.js         # Manages recipe-related routes
│── controllers/
│   ├── user.js           # Implements user login/register logic
│   ├── recipe.js         # Implements recipe CRUD operations
│── middleware/
│   ├── auth.js           # JWT authentication middleware
│── config/
│   ├── db.js             # PostgreSQL database connection
│── index.js              # Main server file
│── .env                  # Environment variables (PORT, DB credentials)
```

## Backend Installation
### Prerequisites

Ensure you have the following installed:
```
Node.js: Download Node.js
PostgreSQL: Download PostgreSQL
```
### Install Dependencies:
```bash
npm install
```
### Setup Environment Variables
```
PORT = 1234
DB_HOST = localhost
DB_PORT = 1324
DB_USER = your_pg_user
DB_PASSWORD = your_pg_password
DB_NAME = recipe

```
### Run Database Migrations:
- Ensure PostgreSQL is running and execute the queries to create tables from **`model/table.js`**

### Start the Application
```
npm start

```
