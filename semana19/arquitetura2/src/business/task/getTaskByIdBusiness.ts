import { selectTaskById } from "../../data/task/selectTaskById"
import { getTaskInputSignupDTO } from "../../model/task"

export const getTaskByIdBusiness = async (input: getTaskInputSignupDTO) : Promise<any> => {
   
   const result = await selectTaskById(input.id)

   if (!result) {
      throw new Error("Tarefa não encontrada")
   }

   const taskWithUserInfo = {
      id: result.id,
      title: result.title,
      description: result.description,
      deadline: result.deadline,
      status: result.status,
      authorId: result.author_id,
      authorNickname: result.nickname
   }

   return taskWithUserInfo
}