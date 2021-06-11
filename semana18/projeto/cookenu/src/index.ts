import app from "./app"
import { recipe } from "./endpoints/recipe"
import { login } from "./endpoints/login"
import { searchProfile } from "./endpoints/searchProfile"
import { signup } from "./endpoints/signup"
import { userProfile } from "./endpoints/userProfile"
import { searchRecipe } from "./endpoints/searchRecipe"
import { follow } from "./endpoints/follow"
import { unfollow } from "./endpoints/unfollow"
import { feed } from "./endpoints/feed"
import { recipeEdit } from "./endpoints/recipeEdit"
import { recipeDelete } from "./endpoints/recipeDelete"
import { profileDelete } from "./endpoints/profileDelete"

app.post('/signup', signup)
app.post('/login', login)

app.get('/user/profile', userProfile)
app.get('/user/feed', feed)
app.get('/user/:id', searchProfile)
app.post('/user/follow', follow)
app.post('/user/unfollow', unfollow)
app.delete('/user/:id', profileDelete)

app.get('/recipe/:id', searchRecipe)
app.post('/recipe', recipe)
app.put('/recipe/edit', recipeEdit)
app.delete('/recipe/:id', recipeDelete)