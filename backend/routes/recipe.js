const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { addRecipe, deleteRecipe, getAllRecipes, updateRecipe, AddFav, deleteFav, getFav } = require('../controller/recipe')

router.use(auth)

router.post('/recipe/add', addRecipe)
router.delete('/recipe/:id', deleteRecipe)
router.get('/recipe/all', getAllRecipes)
router.patch('/recipe/:id', updateRecipe)

router.post('/recipe/fav/:id', AddFav)
router.delete('/recipe/fav/:id', deleteFav)
router.get('/recipe/fav', getFav)





module.exports = router