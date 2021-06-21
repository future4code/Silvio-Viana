import { Casino, LOCATION, NACIONALITY, Result, User, verifyAge } from "../src/verifyAge"

describe("Testando se o verifyAge filtra corretamente", () => {

    test("Testando usuário brasileiro que pode entrar em um casino brasileiro", () => {

        const user: User = {name: "Silvio", age: 20, nacionality: NACIONALITY.BRAZILIAN}
        const casino: Casino = {name: "El Perigroso", location: LOCATION.BRAZIL}
        const result: Result = verifyAge(casino, [user])

        const expected: Result = {
            brazilians: {
                allowed: ["Silvio"],
                unallowed: []
            },
            americans: {
                allowed: [],
                unallowed: []
            }
        }

        expect(result).toEqual(expected)
    })

    test("Testando usuário americano que pode entrar em um casino brasileiro", () => {

        const user: User = {name: "Dean", age: 18, nacionality: NACIONALITY.AMERICAN}
        const casino: Casino = {name: "El Perigroso", location: LOCATION.BRAZIL}
        const result: Result = verifyAge(casino, [user])

        const expected: Result = {
            brazilians: {
                allowed: [],
                unallowed: []
            },
            americans: {
                allowed: ["Dean"],
                unallowed: []
            }
        }

        expect(result).toEqual(expected)
    })

    test("Testando dois usuários americanos e dois brasileiros que não podem entrar em um casino brasileiro", () => {

        const user1: User = {name: "Dean", age: 19, nacionality: NACIONALITY.AMERICAN}
        const user2: User = {name: "Sam", age: 19, nacionality: NACIONALITY.AMERICAN}
        const user3: User = {name: "Silvio", age: 19, nacionality: NACIONALITY.BRAZILIAN}
        const user4: User = {name: "João", age: 19, nacionality: NACIONALITY.BRAZILIAN}

        const casino: Casino = {name: "El Perigroso", location: LOCATION.EUA}
        const result: Result = verifyAge(casino, [user1, user2, user3, user4])

        const expected: Result = {
            brazilians: {
                allowed: [],
                unallowed: ["Silvio", "João"]
            },
            americans: {
                allowed: [],
                unallowed: ["Dean", "Sam"]
            }
        }

        expect(result).toEqual(expected)
    })

    test("Testando dois usuários americanos que podem entrar e dois brasileiros que não podem entrar em um casino brasileiro", () => {

        const user1: User = {name: "Dean", age: 21, nacionality: NACIONALITY.AMERICAN}
        const user2: User = {name: "Sam", age: 21, nacionality: NACIONALITY.AMERICAN}
        const user3: User = {name: "Silvio", age: 19, nacionality: NACIONALITY.BRAZILIAN}
        const user4: User = {name: "João", age: 19, nacionality: NACIONALITY.BRAZILIAN}

        const casino: Casino = {name: "El Perigroso", location: LOCATION.EUA}
        const result: Result = verifyAge(casino, [user1, user2, user3, user4])

        const expected: Result = {
            brazilians: {
                allowed: [],
                unallowed: ["Silvio", "João"]
            },
            americans: {
                allowed: ["Dean", "Sam"],
                unallowed: []
            }
        }

        expect(result).toEqual(expected)
    })

    test("Testando usuário brasileiro que pode entrar em um casino brasileiro", () => {

        const user: User = {name: "Silvio", age: 19, nacionality: NACIONALITY.BRAZILIAN}
        const casino: Casino = {name: "El Perigroso", location: LOCATION.BRAZIL}
        const result: Result = verifyAge(casino, [user])

        expect(result.brazilians.allowed.length).toBeGreaterThan(0)
        expect(result.brazilians.allowed.length).toBeLessThan(2)
    })

    test("Testando usuário americano que pode entrar em um casino brasileiro", () => {

        const user: User = {name: "Dean", age: 19, nacionality: NACIONALITY.AMERICAN}
        const casino: Casino = {name: "El Perigroso", location: LOCATION.BRAZIL}
        const result: Result = verifyAge(casino, [user])

        expect(result.americans.unallowed.length).toBe(0)
    })

    test("Testando dois usuários americanos e dois brasileiros que não podem entrar em um casino americano", () => {

        const user1: User = {name: "Dean", age: 19, nacionality: NACIONALITY.AMERICAN}
        const user2: User = {name: "Sam", age: 19, nacionality: NACIONALITY.AMERICAN}
        const user3: User = {name: "Silvio", age: 19, nacionality: NACIONALITY.BRAZILIAN}
        const user4: User = {name: "João", age: 19, nacionality: NACIONALITY.BRAZILIAN}

        const casino: Casino = {name: "El Perigroso", location: LOCATION.EUA}
        const result: Result = verifyAge(casino, [user1, user2, user3, user4])

        const expected: Result = {
            brazilians: {
                allowed: [],
                unallowed: ["Silvio", "João"]
            },
            americans: {
                allowed: [],
                unallowed: ["Dean", "Sam"]
            }
        }

        expect(result.americans.unallowed.includes("Dean")).toBe(true)
        expect(result.brazilians.unallowed.includes("Silvio")).toBe(true)
    })

    test("Testando dois usuários americanos que podem entrar e dois brasileiros que não podem entrar em um casino brasileiro", () => {

        const user1: User = {name: "Dean", age: 21, nacionality: NACIONALITY.AMERICAN}
        const user2: User = {name: "Sam", age: 21, nacionality: NACIONALITY.AMERICAN}
        const user3: User = {name: "Silvio", age: 19, nacionality: NACIONALITY.BRAZILIAN}
        const user4: User = {name: "João", age: 19, nacionality: NACIONALITY.BRAZILIAN}

        const casino: Casino = {name: "El Perigroso", location: LOCATION.EUA}
        const result: Result = verifyAge(casino, [user1, user2, user3, user4])


        expect(result.brazilians.unallowed.length).toBeGreaterThan(1)
        expect(result.americans.unallowed.length).toBeLessThan(1)
        expect(result.americans.allowed.length).toBe(2)
    })



}) 