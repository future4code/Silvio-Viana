import { createUser } from "../../data/users/createUser";
import { userCreateInputDTO } from "../../model/user";
import { generateToken } from "../../services/authenticator";
import { hash } from "../../services/hashManager";
import { generateId } from "../../services/idGenerator";


export const signupBusiness = async (userData: userCreateInputDTO) : Promise<string> => {

   try {

      if (!userData.name || !userData.email || !userData.password) {

         throw new Error('"name", "email" and "password" must be provided')
      }

      const id: string = generateId()

      const cypherPassword = await hash(userData.password)

      const newUser: userCreateInputDTO = {
         id,
         name: userData.name,
         email: userData.email,
         password: cypherPassword
      }

      await createUser(newUser)

      const token: string = generateToken({ id })

      return token
   }
   catch(error) {

      throw new Error(error.message)
   }
}
