function determineAge (year: number, dateType?: string) : void {

    if (year < 0) { console.log("Ano Inválido") ; return }
    if (dateType === undefined) { dateType = "DC" }
    if (dateType !== "DC" && dateType !== "AC") { console.log("O tipo de Data é Inválido") ; return }
    if (dateType === "AC") { year *= -1 }

    if (year >= 1789) {console.log("Idade Contemporânea") ; return }
    if (year >= 1453) {console.log("Idade Moderna") ; return }
    if (year >= 476) {console.log("Idade Média") ; return }
    if (year >= -4000) {console.log("Idade Antiga") ; return }
    if (year >= -100000) {console.log("Pré-História") ; return }

    console.log("Data muito antiga, humanos modernos ainda não existem.")
}

determineAge(2021, "DC")
