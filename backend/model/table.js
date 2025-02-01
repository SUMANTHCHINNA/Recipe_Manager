const createRecipesTableQuery = `
    CREATE TABLE IF NOT EXISTS recipes (
        recipeId SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        ingredients TEXT NOT NULL,
        description TEXT NOT NULL,
        steps TEXT NOT NULL,
        user_id int NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

const createfavRecipesTableQuery = `
    CREATE TABLE IF NOT EXISTS favorite_recipes (
        favorite_id SERIAL PRIMARY KEY,
        recipeId INT NOT NULL,
        user_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

module.exports = { createRecipesTableQuery, createUsersTableQuery, createfavRecipesTableQuery };
