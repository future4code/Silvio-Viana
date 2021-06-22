export interface Fighter {
    name: string,
    life: number,
    strength: number,
    defense: number
}

export const validateFighter = (figther: Fighter) : boolean => {

    if (!figther.name || !figther.life || !figther.strength || !figther.defense) {

        return false
    }

    if (figther.life < 1 ||figther.strength < 1 || figther.defense < 1) {

        return false
    }
    else {

        return true
    }
}
