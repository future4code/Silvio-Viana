import * as jwt from "jsonwebtoken"
import { USER_ROLES } from "../types"

export type AuthenticationData = {
   id: string,
   role: USER_ROLES
}

export function generateToken(id: string, role: string): string {
   return jwt.sign(
      {id, role},
      process.env.JWT_KEY as string,
      {
         expiresIn: "24min"
      }
   )
}

export function getTokenData(
   token: string
): AuthenticationData {
   return jwt.verify(
      token,
      process.env.JWT_KEY as string
   ) as AuthenticationData
}