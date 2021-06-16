import { getTasksOfUser } from "../../data/task/getTasksOfUser";
import { userSelectDTO } from "../../model/user";
import { selectUserById } from '../../data/user/selectUserById'



export const getUserBusiness = async (input: userSelectDTO) : Promise<any> => {

    try {

        const user = await selectUserById(input.id)
        user.tasks = await getTasksOfUser(input.id)

        return user
    }
    catch(error) {

        throw new Error(error.message)
    }
}