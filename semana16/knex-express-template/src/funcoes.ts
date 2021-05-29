import connection from "./connection"

export function formatoValidoData (data: string) : boolean {
    
    //Check simples, 31 de Fevereiro é uma data aceita.

    if (data.length !== 10) { return false }

    let numbers: string = '1234567890'
    const checkData: string[] = data.split("/")

    if (checkData[0].length !== 2 && checkData[1].length !== 2 && checkData[2].length !== 4) { return false }
    if (isNaN(Number(checkData[0])) || Number(checkData[0]) > 31) { return false }
    if (isNaN(Number(checkData[1])) || Number(checkData[1]) > 12 || Number(checkData[1]) < 1) { return false }
    if (isNaN(Number(checkData[2])) || Number(checkData[2]) < 1) { return false }

    return true
}

export const formatarStringToData = (date: string) : string => {

    return date.split("/").reverse().join("-")
}

export const formatarDataToString = (date: string) : string => {

    const data: Date = new Date(date)
    const dia: string = data.getDate().toString().padStart(2, '0')
    const mes: string = (data.getMonth()+1).toString().padStart(2, '0')
    const ano: number = data.getFullYear()

    return `${dia}/${mes}/${ano}`
}

export const userIdExiste = async (userId: number) : Promise<boolean> => {

    const result = await connection.raw(`SELECT * FROM Users WHERE id = ${userId}`)
    return result[0].length > 0
}

export const nickNameExiste = async (userNick: string) : Promise<boolean> => {
    
    const result = await connection.raw(`SELECT * FROM Users WHERE nickname = "${userNick}"`)
    return result[0].length > 0
}

export const emailExiste = async (userEmail: string) : Promise<boolean> => {
    
    const result = await connection.raw(`SELECT * FROM Users WHERE email = "${userEmail}"`)
    return result[0].length > 0
}

export const TaskIdExiste = async (taskId: number) : Promise<boolean> => {
    
    const result = await connection.raw(`SELECT * FROM Tasks WHERE id = ${taskId}`)
    return result[0].length > 0
}

export const varchar255 = (string: string) : boolean => {

    return String(string).length <= 255
}

export const numeroGigante = (number: number) : boolean => {

    return number > 1000000000
}