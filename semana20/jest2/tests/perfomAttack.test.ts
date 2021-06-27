import { Fighter } from "../src/model/fighter";
import { perfomAttack2 } from "../src/perfomAttack";
import { validatorMockFail } from "./mocks/validatorMockFail";
import { validatorMockSucess } from "./mocks/validatorMockSucess";

describe("Testando ataques", () => {

    test("Ataque feito com sucesso", () => {

        const validatorMock = jest.fn(validatorMockSucess);

        const attacker: Fighter = {
            name: "Scorpion",
            life: 1500,
            defense: 200,
            strength: 600
        }
      
        const defender: Fighter = {
            name: "Kitana",
            life: 1500,
            defense: 400,
            strength: 800
        }

        perfomAttack2(attacker, defender, validatorMock)

        expect(defender.life).toBe(1300)
        expect(validatorMock).toHaveBeenCalled()
        expect(validatorMock).toHaveBeenCalledTimes(2)
        expect(validatorMock).toHaveReturnedTimes(2)
    })

    test("Ataque com lutador inválido", () => {
        expect.assertions(4)
        const validatorMock = jest.fn(validatorMockFail);

        const attacker: Fighter = {
            name: "Scorpion",
            life: -1500,
            defense: 200,
            strength: 600
        }
      
        const defender: Fighter = {
            name: "Kitana",
            life: 1500,
            defense: 400,
            strength: 800
        }

        try {

            perfomAttack2(attacker, defender, validatorMock)
        }
        catch(error) {

            expect(error.message).toBe("Lutador Inválido")
            expect(validatorMock).toHaveBeenCalled()
            expect(validatorMock).toHaveBeenCalledTimes(1)
            expect(validatorMock).toHaveReturnedTimes(1)
        }
    })
})