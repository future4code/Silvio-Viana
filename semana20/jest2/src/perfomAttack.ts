import { Fighter } from './model/fighter'
import { validateFighter } from './validateFigther'

export const perfomAttack1 = (attacker: Fighter, defender: Fighter) : void => {

    if (!validateFighter(attacker) || !validateFighter(defender)) {

        throw new Error("Lutador Inválido")
    }

    if (attacker.strength > defender.defense) {

        defender.life -= attacker.strength - defender.defense
    }
}

export const perfomAttack2 = 
(attacker: Fighter, defender: Fighter, validator: (fighter: Fighter) => boolean) : void => {

    if (!validator(attacker) || !validator(defender)) {

        throw new Error("Lutador Inválido")
    }

    if (attacker.strength > defender.defense) {

        defender.life -= attacker.strength - defender.defense
    }
}