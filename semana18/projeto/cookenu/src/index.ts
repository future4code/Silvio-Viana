import app from "./app"
import { signup } from "./endpoints/signup"

app.post('/signup', signup)