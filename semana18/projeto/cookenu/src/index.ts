import app from "./app"
import { login } from "./endpoints/login"
import { signup } from "./endpoints/signup"
import { userProfile } from "./endpoints/userProfile"

app.post('/signup', signup)
app.post('/login', login)
app.get('/user/profile', userProfile)