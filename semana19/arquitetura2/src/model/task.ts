export type taskData = {
   title: string,
   description: string,
   deadline: string,
   authorId: string
}

export type task = taskData & { id: string }

export type getTaskInputSignupDTO = {
   id: string
}

export type Task = {
   title: string,
   description: string,
   deadline: string,
   authorId: string
}