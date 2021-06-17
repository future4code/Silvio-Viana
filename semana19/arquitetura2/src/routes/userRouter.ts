import express from "express"
import { getUser } from "../controller/user/getUser"
import { login } from "../controller/user/login"
import { signup } from "../controller/user/signup"

export const userRouter = express.Router()

userRouter.post("/login", login)
userRouter.post("/signup", signup)
userRouter.post("/:id", getUser)