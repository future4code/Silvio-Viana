import { Request, Response } from 'express'
import { generateHash } from '../services/handleAuthentication'
import { createUser } from '../services/handleDB'
import { generateId } from '../services/handleId'
import { generateToken } from '../services/handleToken'
import { userCreator } from '../types'

export const signup = async (req: Request, res: Response) : Promise<void> => {

   try {

      const { name, email, password } = req.body

      if (!name || !email || !password) { throw new Error("Você deve fornecer: name, email e password") }
      if (String(password).length < 6) { throw new Error("O password deve ter no mínimo 6 caracteres") }

      const user: userCreator = {
         id: generateId(),
         name,
         email,
         password: await generateHash(password)
      }

      await createUser(user)

      res.status(200).send({ token: generateToken(user.id) })
   }
   catch(err) {

      res.status(400).send({ message: err.message })
   }
}