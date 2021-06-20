export type userCreateInputDTO = {
   id?: string,
   name: string,
   email: string,
   password: string
}

export type userLoginInputDTO = {
   email: string,
   password: string
}

export type user = {
   id: string,
   name: string,
   email: string,
   password: string
}

export type authenticationData = {
   id: string
}