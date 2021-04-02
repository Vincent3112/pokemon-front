import { Pokemon } from "./pokemon.entity";

export interface PokemonList {
    count: number;
    next: string;
    previous: string;
    results: Pokemon[]
}