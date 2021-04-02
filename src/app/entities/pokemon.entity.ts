import { PokemonAbility } from "./pokemon-ability.entity";

export interface Pokemon {
    name: string;
    height: number;
    weight: number;
    abilities: PokemonAbility[];
}