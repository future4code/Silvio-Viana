import { Post, createPost, getPostById, deletePostById } from "../src/handlePost";

describe("Testando criação de posts", () => {

    const post1: Post = {id: "xlr8", title: "post1", description: "blabla"}
    const post2: Post = {id: "xlr9", title: "post2", description: "blablabla"}

    test("Criando post1", async () => {

        await createPost(post1)

        const result = await getPostById(post1)

        expect(result).toEqual(post1)
    })

    test("Criando post2 duas vezes", async () => {

        try {

            await createPost(post2)
            await createPost(post2)
        }
        catch(error) {

            expect(error).not.toBe(undefined)
        }
    })

    afterAll (async () => {

        await deletePostById(post1)
        await deletePostById(post2)
    })
})