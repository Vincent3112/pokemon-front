import { PokemonAccessPoint } from "./pokemon-access-point.entity";

export interface PokemonList {
    count: number;
    next: string;
    previous: string;
    results: PokemonAccessPoint[]
}