import express from "express"
import { signup } from "../controller/users/signup"
import { login } from "../controller/users/login"

export const usersRouter = express.Router()

usersRouter.post("/signup", signup)
usersRouter.post("/login", login)
