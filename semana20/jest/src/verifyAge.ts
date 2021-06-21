import { userInfo } from "os"

export enum LOCATION {

    EUA = "EUA",
    BRAZIL = "BRAZIL",
}
  
export enum NACIONALITY {

    BRAZILIAN = "BRAZILIAN",
    AMERICAN = "AMERICAN",
}
  
export interface User {

    name: string;
    age: number;
    nacionality: NACIONALITY;
}
  
export interface Casino {

    name: string;
    location: LOCATION;
}

export interface Result {
  brazilians: ResultItem;
  americans: ResultItem;
}

export interface ResultItem {
  allowed: string[];
  unallowed: string[];
}


export const verifyAge = (casino: Casino, users: User[]): Result => {

    const result: Result = {
        brazilians: {
            allowed: [],
            unallowed: []
        },
        americans: {
            allowed: [],
            unallowed: []
        }
    }

    const permitedAge = casino.location === LOCATION.BRAZIL ? 18 : 21

    users.forEach((user) => {

        if (user.nacionality === NACIONALITY.BRAZILIAN) {

            user.age >= permitedAge 
            ? 
            result.brazilians.allowed.push(user.name) 
            :
            result.brazilians.unallowed.push(user.name) 
        }
        else if (user.nacionality === NACIONALITY.AMERICAN) {

            user.age >= permitedAge 
            ? 
            result.americans.allowed.push(user.name) 
            :
            result.americans.unallowed.push(user.name)
        }
    })

    return result
}