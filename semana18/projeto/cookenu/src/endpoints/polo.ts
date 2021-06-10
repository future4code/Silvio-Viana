import { Request, Response } from 'express'

export const polo = async (req: Request, res: Response) : Promise<void> => {

   console.log("test")
   res.status(200).send({ message: "Polo"})
}