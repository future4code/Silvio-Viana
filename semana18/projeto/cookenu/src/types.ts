export type userCreator = {
    id: string,
    name: string,
    email: string,
    role: ROLE,
    password: string
}

export type recipeCreator = {
    id: string,
    title: string,
    description: string,
    instruction: string,
    creatorId: string
}

export enum ROLE {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}