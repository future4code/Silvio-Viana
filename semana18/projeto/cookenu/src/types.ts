export type userCreator = {
    id: string,
    name: string,
    email: string,
    password: string
}

export type recipeCreator = {
    id: string,
    title: string,
    description: string,
    instruction: string,
    creatorId: string
}