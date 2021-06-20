import { postCreator } from "../../model/post"
import { connection } from "../connection"


export const createPost = async (postData: postCreator) : Promise<void> => {

    await connection.raw(`INSERT INTO labook_posts VALUES 
    ("${postData.id}", "${postData.photo}", "${postData.description}", "${postData.type}",
     CURDATE(), "${postData.authorId}")`)
}