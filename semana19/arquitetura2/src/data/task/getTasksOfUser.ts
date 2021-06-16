import { Task } from "../../model/task";
import { connection } from "../connection";

export const getTasksOfUser = async (id: string): Promise<Task[]> => {

   const result = await connection.raw(`SELECT * FROM to_do_list_tasks WHERE author_id = "${id}"`)

   return result[0]
}