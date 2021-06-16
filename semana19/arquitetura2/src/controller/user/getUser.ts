import { Request, Response } from 'express'
import { getTasksOfUser } from '../../data/task/getTasksOfUser'
import { selectUserByEmail } from '../../data/user/selectUserByEmail'
import { UserSelect, userSelectDTO } from '../../model/user'


export const getUser = async (req: Request, res: Response) : Promise<void> => {

    try {

        const userInput: userSelectDTO = {
            id: req.params.id
        }

        const user: UserSelect = await selectUserByEmail(userInput.id)

        res.status(200).send({ user })
    }
    catch(error) {

        res.status(400).send({error: error.message})
    }
}