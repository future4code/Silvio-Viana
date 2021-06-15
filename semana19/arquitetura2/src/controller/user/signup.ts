import { Request, Response } from "express";
import { signupBusiness } from "../../business/user/signupBusiness";
import { signupInputDTO } from "../../model/user";

export const signup = async (req: Request,res: Response) : Promise<void> => {

   try {
      
      const { name, nickname, email, password, role } = req.body

      const signupInput: signupInputDTO = {
         name,
         nickname,
         email,
         password,
         role
      }

      const token: string = await signupBusiness(signupInput)

      res
         .status(201)
         .send({
            message: "Usuário criado!",
            token
         })

   } catch (error) {

      res.status(400).send({error: error.message })
   }
}