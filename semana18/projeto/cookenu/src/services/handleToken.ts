import * as jwt from 'jsonwebtoken'

export const generateToken = (id: string) : string => {

    return  jwt.sign({id}, String(process.env.JWT_KEY), {expiresIn: "1y"})
}

export const getDataFromToken = (token: string) : any => {

    return jwt.verify(token, String(process.env.JWT_KEY))
}