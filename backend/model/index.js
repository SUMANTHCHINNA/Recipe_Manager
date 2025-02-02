const { client } = require('../config/db');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const checkUserByEmail = async (email) => {
    try {
        const result = await client.query('SELECT * FROM users WHERE email = $1', [email])
        return (result.rows.length > 0)
    } catch (error) {
        console.error('Error in checkUser function:', error)
    }
}

const createUser = async ({ username, email, password }) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const result = await client.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashedPassword]
        )
        return result.rows[0]
    } catch (error) {
        console.error('Error in creating User', error)
        throw error
    }
}

const checkPaswword = async (email, password) => {
    try {
        const match = await client.query(`SELECT password FROM users WHERE email = $1`,
            [email])
        const p = (match.rows[0].password)
        return (await bcrypt.compare(password, p))
    } catch (error) {
        console.error(`Error in checking password ${error}`)
    }
}

const getUserID = async (email) => {
    try {
        const result = await client.query(`SELECT * FROM users WHERE email = $1`,
            [email])
        return (result.rows[0].user_id)
    } catch (error) {
        console.error(`Error in getting userId ${error}`)
    }
}

const createToken = async (_id) => {
    try {
        return await jwt.sign({ _id }, process.env.KEY)
    } catch (error) {
        console.error(`Error in jwt sign ${error}`)
    }
}

const getUserById = async (id) => {
    try {
        const result = await client.query(`SELECT * FROM users WHERE user_id = $1`,
            [id])
        return (result.rows[0])
    } catch (error) {
        console.error(`Error in getUserById ${error}`)
    }
}

const addDish = async ({ title, ingredients, description, steps, id }) => {
    try {
        await client.query(`INSERT INTO recipes(title, ingredients, description, steps, user_id) VALUES ($1,$2,$3,$4,$5)`,
            [title, ingredients, description, steps, id])
    } catch (error) {
        console.error(`Error in Adding Recipe ${console.error()}`)
    }
}

const checkDish = async (title, id) => {
    try {
        const result = await client.query(`SELECT title FROM recipes WHERE title = $1 and user_id = $2`, [title, id])
        return (result.rows.length > 0)
    } catch (error) {
        console.error(`Error at checking Dish in list ${error}`)
    }
}

const checkId = async (u_id, r_id) => {
    try {
        const result = await client.query(`SELECT * FROM recipes WHERE user_id = $1 and recipeid = $2`, [u_id, r_id])
        return result.rows.length > 0
    } catch (error) {
        console.error(`Error in checking recipe Id ${error}`)
    }
}

const deleteDish = async (u_id, r_id) => {
    try {
        await client.query(`DELETE FROM recipes WHERE recipeid = $1 AND user_id = $2`, [r_id, u_id])
    } catch (error) {
        console.error(`Error in deleting recipe ${error}`)
    }
}

const getAllDish = async (id) => {
    try {
        const result = await client.query(`SELECT * FROM recipes WHERE user_id = $1`, [id])
        return result.rows

    } catch (error) {
        console.error(`Error in fetching all recipes ${error}`);
    }
}

const updateDish = async ({ title, ingredients, description, steps, u_id, r_id }) => {
    try {
        const result = await client.query(`UPDATE recipes SET title = $1,ingredients = $2 ,description = $3, steps = $4 where user_id = $5 and recipeId = $6`,
            [title, ingredients, description, steps, u_id, r_id]
        )
    } catch (error) {
        console.error(`Error in updating recipe ${error}`)

    }
}

const addDishFav = async (r_id, u_id) => {
    try {
        await client.query(`INSERT INTO favorite_recipes (recipeId,user_id) VALUES ($1,$2)`, [r_id, u_id])
    } catch (error) {
        console.error(`Error in adding Recipe to favorite ${error}`)
    }
}

const deleteDishFav = async (r_id, u_id) => {
    try {
        await client.query(`DELETE FROM favorite_recipes WHERE recipeId = $1 and user_id = $2`, [r_id, u_id])
    } catch (error) {
        console.error(`Error in deleting Recipe from favorite ${error}`)

    }
}

const getAllFavDish = async (u_id) => {
    try {
        const result = await client.query(`SELECT recipes.title,recipes.ingredients,recipes.description,recipes.steps,recipes.user_id
            FROM recipes
            INNER JOIN favorite_recipes ON favorite_recipes.recipeId = recipes.recipeId
            WHERE recipes.user_id = $1`, [u_id])
        return result.rows
    } catch (error) {
        console.error(`Error in fetching All Recipes from favorite ${error}`)

    }
}

const getOneDish = async (u_id, r_id) => {
    try {
        const result = await client.query(`SELECT * FROM recipes WHERE recipeId = $1 AND user_id = $2`, [r_id, u_id])
        return result.rows[0]
    } catch (error) {
        console.error(`Error in fetching specific recipe ${error}`)
    }

}

const checkFavId = async (r_id, u_id) => {
    try {
        const result = await client.query(`SELECT * FROM favorite_recipes WHERE recipeId = $1 and user_id = $2`, [r_id, u_id])
        return result.rows.length == 0
    } catch (error) {
        console.error(`Error checking favorite_recipes id ${error}`)
    }

}

module.exports = {
    createUser,
    checkUserByEmail,
    checkPaswword,
    getUserID,
    createToken,
    getUserById,
    addDish,
    checkDish,
    checkId,
    deleteDish,
    getAllDish,
    updateDish,
    addDishFav,
    deleteDishFav,
    getAllFavDish,
    getOneDish,
    checkFavId
};
