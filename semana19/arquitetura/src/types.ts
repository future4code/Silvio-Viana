export type userCreator = {
    email: string,
    name: string,
    password: string,
    role: string
}

export type userLogin = {
    email: string,
    password: string
}

export type deleteType = {
    token: string,
    id: string
}

export enum USER_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
 }