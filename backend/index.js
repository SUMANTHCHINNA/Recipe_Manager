const express = require('express');
const { createRecipesTableQuery, createUsersTableQuery, createfavRecipesTableQuery } = require('./model/table.js');
const { client } = require('./config/db.js');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const userRoutes = require('./routes/user.js');
const recipeRouters = require('./routes/recipe.js')

app.use(express.json());
app.use(userRoutes);
app.use(recipeRouters)

const port = process.env.PORT || 7607;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);

    // Create the tables after the server starts
    client.query(createRecipesTableQuery, (err) => {
        if (err) return console.error('Error creating recipes table', err.stack);
        console.log('Recipes table created successfully');

        client.query(createUsersTableQuery, (err) => {
            if (err) return console.error('Error creating users table', err.stack);
            console.log('Users table created successfully');
        });

        client.query(createfavRecipesTableQuery, (err) => {
            if (err) return console.error('Error creating users table', err.stack);
            console.log('Favorite_Recipes table created successfully');
        });
    });
});
