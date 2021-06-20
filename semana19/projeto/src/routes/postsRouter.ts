import express from "express"
import { postCreate } from '../controller/posts/postCreate'
import { postSelect } from '../controller/posts/postSelect'

export const postsRouter = express.Router()

postsRouter.put("/create", postCreate)
postsRouter.get("/:id", postSelect)