import { Request, Response } from 'express'
import { generateHash } from '../services/handleAuthentication'
import { createUser, emailInUse } from '../services/handleDB'
import { isVarchar64 } from '../services/handleErrors'
import { generateId } from '../services/handleId'
import { generateToken, getDataFromToken } from '../services/handleToken'
import { userCreator, ROLE } from '../types'

export const signup = async (req: Request, res: Response) : Promise<void> => {

   try {

      const { name, email, role, password } = req.body

      if (!name || !email || !role  || !password) 
      { throw new Error("Você deve fornecer: name, email, role e password") }

      if (!isVarchar64([name, email, role, password]))
      { throw new Error("Esses itens devem ser texto e possuir no máximo 64 caracteres: name, email, role e password") }

      if (password.length < 6) { throw new Error("O password deve ter no mínimo 6 caracteres") }

      if (!(role in ROLE)) { throw new Error("'role' deve ser 'NORMAL' ou 'ADMIN'") }


      if (role === "ADMIN") {

         const token = req.headers.authorization as string
         const tokenRole = getDataFromToken(token).role

         if (tokenRole !== "ADMIN") { throw new Error("Apenas ADMINS podem criar outros ADMIN") }
      }

      if (await emailInUse(email)) { throw new Error("O email já está em uso") }

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