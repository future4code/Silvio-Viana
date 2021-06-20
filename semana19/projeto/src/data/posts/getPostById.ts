import { post } from "../../model/post"
import { connection } from "../connection"


export const getPostById = async (id: string) : Promise<post> => {

    const result = await connection.raw(`SELECT id, photo, description, type, 
    created_at as createdAt, author_id as authorId FROM labook_posts WHERE id = "${id}"`)

    return result[0][0]
}