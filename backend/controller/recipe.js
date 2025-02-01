const { addDish, checkDish, checkId, deleteDish, getAllDish, updateDish, addDishFav, deleteDishFav, getAllFavDish } = require('../model/index')

const addRecipe = async (req, res) => {
    try {
        const { title, ingredients, description, steps } = req.body
        const id = req.user.user_id
        if (!title || !ingredients || !description || !steps) {
            res.status(400).json({ status: false, message: `Fill all fields` })
        }
        if (title.length == 0 || ingredients.length == 0 || description.length == 0 || steps.length == 0) {
            res.status(400).json({ status: false, message: `Fill all fields` })
        }
        const check = await checkDish(title, id)
        if (!check) {
            await addDish({ title, ingredients, description, steps, id })
            res.status(201).json({ status: true, message: `Recipe added sucessfully` })
        }
        else {
            res.status(406).json({ status: false, message: `Recipe already present in list` })
        }
    } catch (error) {
        res.status(500).json({ status: false, message: error.message })
    }
}

const deleteRecipe = async (req, res) => {
    try {
        const r_id = req.params.id
        const u_id = req.user.user_id
        const c = await checkId(u_id, r_id)
        if (c) {
            await deleteDish(u_id, r_id)
            res.status(201).json({ status: true, message: `Recipe deleted successfully` })
        }
        else {
            res.status(404).json({ status: false, message: `Recipe Not found` })
        }
    } catch (error) {
        res.status(500).json({ status: false, message: error.message })
    }
}

const getAllRecipes = async (req, res) => {
    try {
        const id = req.user.user_id
        const a = await getAllDish(id)
        res.status(201).json({ status: true, message: a })
    } catch (error) {
        res.status(500).json({ status: false, message: error.message })
    }
}

const updateRecipe = async (req, res) => {
    try {
        const r_id = req.params.id
        const u_id = req.user.user_id
        const c = await checkId(u_id, r_id)
        if (c) {
            const { title, ingredients, description, steps } = req.body
            await updateDish({ title, ingredients, description, steps, u_id, r_id })
            res.status(201).json({ status: true, message: `Recipe updated successfully` })

        }
        else {
            res.status(404).json({ status: false, message: `Recipe Not found` })
        }
    } catch (error) {
        res.status(500).json({ status: false, message: error.message })
    }

}

const AddFav = async (req, res) => {
    try {
        const r_id = req.params.id
        const u_id = req.user.user_id
        const c = await checkId(u_id, r_id)
        if (c) {
            await addDishFav(r_id, u_id)
            res.status(201).json({ status: true, message: `Recipe Added to Favorite List` })
        }
        else {
            res.status(404).json({ status: false, message: `Recipe Not found` })
        }


    } catch (error) {
        res.status(500).json({ status: false, message: error.message })

    }
}

const deleteFav = async (req, res) => {
    try {
        const r_id = req.params.id
        const u_id = req.user.user_id
        const c = await checkId(u_id, r_id)
        if (c) {
            await deleteDishFav(r_id, u_id)
            res.status(201).json({ status: true, message: `Recipe Deleted from Favorite List` })
        }
        else {
            res.status(404).json({ status: false, message: `Recipe Not found` })
        }
    } catch (error) {
        res.status(500).json({ status: false, message: error.message })
    }
}

const getFav = async (req, res) => {
    try {
        const u_id = req.user.user_id
        const f = await getAllFavDish(u_id)
        res.status(201).json({ status: true, message: f })
    } catch (error) {
        res.status(500).json({ status: false, message: error.message })
    }
}

module.exports = {
    addRecipe,
    deleteRecipe,
    getAllRecipes,
    updateRecipe,
    AddFav,
    deleteFav,
    getFav
}