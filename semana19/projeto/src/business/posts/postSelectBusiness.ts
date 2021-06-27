import { getPostById } from "../../data/posts/getPostById"
import { post } from "../../model/post"

export const postSelectBusiness = async (id: string) : Promise<post> => {

    try {

        const queryResult: post = await getPostById(id)

        if (!queryResult) {

            throw new Error("Post not found")
        }

        const post: post = {
            id: queryResult.id,
            photo: queryResult.photo,
            description: queryResult.description,
            type: queryResult.type,
            createdAt: queryResult.createdAt,
            authorId: queryResult.authorId,
        }
        
        return post
    }
    catch(error) {
 
       throw new Error(error.message)
    }
 }