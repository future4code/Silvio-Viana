import app from "./app"
import { login } from "./endpoints/login"
import signup from "./endpoints/signup"
import { profile } from "./endpoints/profile"
import { remove } from "./endpoints/delete"
import { user } from "./endpoints/user"

app.post('/user/signup', signup)
app.post('/user/login', login)
app.get('/user/profile', profile)
app.delete('/user/:id', remove)
app.get('/user', user)