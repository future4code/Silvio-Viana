import * as bcrypt from 'bcryptjs'

export const generateHash = async (password: string) : Promise<string> => {

    const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_COST))
    return await bcrypt.hash(password, salt)
}

export const checkPassword = async (password: string, hash: string) : Promise<boolean> => {

    return await bcrypt.compare(password, hash)
}