import app from "./app"
import { recipe } from "./endpoints/recipe"
import { login } from "./endpoints/login"
import { searchProfile } from "./endpoints/searchProfile"
import { signup } from "./endpoints/signup"
import { userProfile } from "./endpoints/userProfile"
import { searchRecipe } from "./endpoints/searchRecipe"
import { follow } from "./endpoints/follow"

app.post('/signup', signup)
app.post('/login', login)
app.get('/user/profile', userProfile)
app.get('/user/:id', searchProfile)
app.post('/user/follow', follow)
app.post('/recipe', recipe)
app.get('/recipe/:id', searchRecipe)