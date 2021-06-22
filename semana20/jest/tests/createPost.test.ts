import { Post, createPost, getPostById, deletePostById } from "../src/handlePost";

describe("Testando criação de posts", () => {

    const post1: Post = {id: "xlr8", title: "post1", description: "blabla"}

    test("Criando post1", async () => {

        const post: Post = {id: "xlr8", title: "post1", description: "blabla"}

        await createPost(post)

        const result = await getPostById(post)

        expect(result).toEqual({id: "xlr8", title: "post1", description: "blabla"})
    })

    afterAll (async () => {

        await deletePostById(post1)
    })
})