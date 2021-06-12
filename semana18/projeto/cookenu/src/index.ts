import app from "./app"
import { recipeCreate } from "./endpoints/recipeCreate"
import { login } from "./endpoints/login"
import { profileSearch } from "./endpoints/profileSearch"
import { signup } from "./endpoints/signup"
import { profile } from "./endpoints/profile"
import { recipeSearch } from "./endpoints/recipeSearch"
import { follow } from "./endpoints/follow"
import { unfollow } from "./endpoints/unfollow"
import { feed } from "./endpoints/feed"
import { recipeEdit } from "./endpoints/recipeEdit"
import { recipeDelete } from "./endpoints/recipeDelete"
import { profileDelete } from "./endpoints/profileDelete"

app.post('/signup', signup)
app.post('/login', login)

app.get('/user/profile', profile)
app.get('/user/feed', feed)
app.get('/user/:id', profileSearch)
app.post('/user/follow', follow)
app.post('/user/unfollow', unfollow)
app.delete('/user/:id', profileDelete)

app.get('/recipe/:id', recipeSearch)
app.post('/recipe', recipeCreate)
app.put('/recipe/edit', recipeEdit)
app.delete('/recipe/:id', recipeDelete)