import { connection } from "./connection"

export interface Post {
    id: string,
    title: string,
    description: string
}

export const createPost = async (post: Post) : Promise<void> => {

    await connection.raw(`INSERT INTO jest_posts VALUES 
    ("${post.id}", "${post.title}", "${post.description}")`)
}

export const getPostById = async (post: Post) : Promise<void> => {

    const result = await connection.raw(`SELECT * FROM jest_posts WHERE id = "${post.id}"`)

    return result[0][0]
}

export const deletePostById = async (post: Post) : Promise<void> => {

    await connection.raw(`DELETE FROM jest_posts WHERE id = "${post.id}"`)
}
