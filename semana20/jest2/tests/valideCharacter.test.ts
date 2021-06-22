import { Fighter, validateFighter } from "../src/validadeCharacter"

describe("Testando validação de lutadores", () => {

    test("Personagem com nome vazio, deve retornar false", () => {

        const fighter: Fighter = {
            name: "",
            life: 1500,
            strength: 100,
            defense: 100
        }

        const result = validateFighter(fighter)

        expect(result).toBe(false)
    })

    test("Personagem com vida = 0, deve retornar false", () => {

        const fighter: Fighter = {
            name: "Marcelo",
            life: 0,
            strength: 100,
            defense: 100
        }

        const result = validateFighter(fighter)

        expect(result).toBe(false)
    })

    test("Personagem com força = 0, deve retornar false", () => {

        const fighter: Fighter = {
            name: "Marcelo",
            life: 1500,
            strength: 0,
            defense: 100
        }

        const result = validateFighter(fighter)

        expect(result).toBe(false)
    })

    test("Personagem com defesa = 0, deve retornar false", () => {

        const fighter: Fighter = {
            name: "Marcelo",
            life: 1500,
            strength: 100,
            defense: 0
        }

        const result = validateFighter(fighter)

        expect(result).toBe(false)
    })

    test("Personagem com vida negativa, deve retornar false", () => {

        const fighter: Fighter = {
            name: "Marcelo",
            life: -1500,
            strength: 100,
            defense: 100
        }

        const result = validateFighter(fighter)

        expect(result).toBe(false)
    })

    test("Personagem válido, deve retornar true", () => {

        const fighter: Fighter = {
            name: "Marcelo",
            life: 1500,
            strength: 100,
            defense: 100
        }

        const result = validateFighter(fighter)

        expect(result).toBe(true)
    })


})
