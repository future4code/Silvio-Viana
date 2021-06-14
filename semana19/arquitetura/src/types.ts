export type userCreator = {
    email: string,
    name: string,
    password: string,
    role: string
}

export enum USER_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
 }