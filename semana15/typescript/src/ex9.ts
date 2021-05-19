function converterDNA (dna: string) : string {

    let rna: string = ""

    for (let char of dna) {

        if (char === "A") { rna += "U"}
        else if (char === "T") { rna += "A"}
        else if (char === "G") { rna += "C"}
        else if (char === "C") { rna += "G"}
        else { rna += " "}
    }

    return rna
}

console.log(converterDNA("ATTGCTGCGCATTAACGACGCGTA"))
