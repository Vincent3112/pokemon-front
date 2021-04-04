import { PokemonAbilities } from "./pokemon-abilities.entity";

export interface Pokemon {
    name: string;
    height: number;
    weight: number;
    abilities: PokemonAbilities[];
}