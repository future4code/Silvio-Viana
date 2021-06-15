import { Task } from "../../model/task";
import { connection } from "../connection";

export const selectTaskById = async (id: string): Promise<Task> => {

   const result = await connection.raw(`
        SELECT tasks.*, nickname FROM to_do_list_tasks AS tasks
        JOIN to_do_list_users AS users
        ON author_id = users.id
        WHERE tasks.id = '${id}';
    `)

   const task = result[0][0]

   return {
      title: task.title,
      description: task.description,
      deadline: task.deadline,
      authorId: task.authorId
   }
}