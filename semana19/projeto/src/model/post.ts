export enum POST_TYPES {
   NORMAL = "NORMAL",
   EVENT = "EVENT"
}

export type post = {
   id: string,
   photo: string,
   description: string,
   type: POST_TYPES,
   createdAt: Date,
   authorId: string
}

export type postCreateInputDTO = {
   token: string,
   photo: string,
   description: string,
   type: POST_TYPES
}

export type postCreator = {
   id: string,
   photo: string,
   description: string,
   type: POST_TYPES,
   authorId: string
}