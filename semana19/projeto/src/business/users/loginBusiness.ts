import { getUserByEmail } from "../../data/users/getUserByEmail";
import { user, userLoginInputDTO } from "../../model/user";
import { generateToken } from "../../services/authenticator";
import { compare } from "../../services/hashManager";


export const loginBusiness = async (userData: userLoginInputDTO) : Promise<string> => {

   try {

      if (!userData.email || !userData.password) {

        throw new Error('"email" and "password" must be provided')
      }

      const queryResult: any = await getUserByEmail(userData.email)

      if (!queryResult) {

         throw new Error("Invalid credentials")
      }

      const user: user = {

         id: queryResult.id,
         name: queryResult.name,
         email: queryResult.email,
         password: queryResult.password
      }

      const passwordIsCorrect: boolean = await compare(userData.password, user.password)

      if (!passwordIsCorrect) {

         throw new Error("Invalid credentials")
      }

      const token: string = generateToken({ id: user.id })

      return token
   }
   catch(error) {

      throw new Error(error.message)
   }
}