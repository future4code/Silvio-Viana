import app from "./app"
import { recipe } from "./endpoints/recipe"
import { login } from "./endpoints/login"
import { searchProfile } from "./endpoints/searchProfile"
import { signup } from "./endpoints/signup"
import { userProfile } from "./endpoints/userProfile"

app.post('/signup', signup)
app.post('/login', login)
app.get('/user/profile', userProfile)
app.get('/user/:id', searchProfile)
app.post('/recipe', recipe)