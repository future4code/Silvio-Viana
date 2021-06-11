import { Request, Response } from 'express'
import { generateHash } from '../services/handleAuthentication'
import { createUser } from '../services/handleDB'
import { generateId } from '../services/handleId'
import { generateToken } from '../services/handleToken'
import { userCreator, ROLE } from '../types'

export const signup = async (req: Request, res: Response) : Promise<void> => {

   try {

      const { name, email, role, password } = req.body

      if (!name || !email || !role  || !password) 
      { throw new Error("Você deve fornecer: name, email, role e password") }
      if (String(password).length < 6) { throw new Error("O password deve ter no mínimo 6 caracteres") }
      if (!(role in ROLE)) { throw new Error("'role' deve ser 'NORMAL' ou 'ADMIN'") }

      const user: userCreator = {
         id: generateId(),
         name,
         email,
         role,
         password: await generateHash(password)
      }

      await createUser(user)

      res.status(200).send({ token: generateToken(user.id, user.role) })
   }
   catch(err) {

      res.status(400).send({ message: err.message })
   }
}