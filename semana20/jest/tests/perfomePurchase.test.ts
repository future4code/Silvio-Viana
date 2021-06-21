import  { perfomePurchase } from '../src/perfomePurchase'

describe("Testando se a função só realiza com saldo suficiente", () => {

    test("Testando saldo maior que valor da compra", () => {

        const result = perfomePurchase({name: "Marcelo", balance: 300}, 200)

        expect(result).toEqual({name: "Marcelo", balance: 100})
    })

    test("Testando saldo igual valor da compra", () => {

        const result = perfomePurchase({name: "Marcelo", balance: 300}, 300)

        expect(result).toEqual({name: "Marcelo", balance: 0})
    })

    test("Testando saldo menor que valor da compra", () => {

        const result = perfomePurchase({name: "Marcelo", balance: 300}, 400)

        expect(result).toBe(undefined)
    })
})