import app from "./app"
import { login } from "./endpoints/login"
import signup from "./endpoints/signup"
import { profile } from "./endpoints/profile"

app.post('/user/signup', signup)
app.post('/user/login', login)
app.get('/user/profile', profile)