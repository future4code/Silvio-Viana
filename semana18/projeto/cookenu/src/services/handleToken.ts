import * as jwt from 'jsonwebtoken'

export const generateToken = (id: string, role: string) : string => {

    return  jwt.sign({id, role}, String(process.env.JWT_KEY), {expiresIn: "1y"})
}

export const getDataFromToken = (token: string) : any => {

    return jwt.verify(token, String(process.env.JWT_KEY))
}