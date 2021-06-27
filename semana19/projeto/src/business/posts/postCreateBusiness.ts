import { postCreateInputDTO, postCreator, POST_TYPES } from "../../model/post"
import { authenticationData } from "../../model/user"
import { getTokenData } from "../../services/authenticator"
import { generateId } from "../../services/idGenerator"
import { createPost } from '../../data/posts/createPost'


export const postCreateBusiness = async (input: postCreateInputDTO) : Promise<void> => {

    try {

        const tokenData: authenticationData = getTokenData(input.token)

        if (!input.photo || !input.description || !input.type) {

            throw new Error('"photo", "description" and "type" must be provided')
        }

        if (!(input.type in POST_TYPES)) {

            throw new Error('"type" must be "NORMAL" or "EVENT"')
        }

        const id: string = generateId()

        const newPost: postCreator = {
            id,
            photo: input.photo,
            description: input.description,
            type: input.type,
            authorId: tokenData.id
        }

        await createPost(newPost)
    }
    catch(error) {
 
       throw new Error(error.message)
    }
 }