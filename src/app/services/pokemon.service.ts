import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PokemonList } from "../entities/pokemon-list.entity";
import { Pokemon } from "../entities/pokemon.entity";

@Injectable({
    providedIn: 'root'
})
export class PokemonService {

    public favouritePokemons: string[];

    constructor(private readonly http: HttpClient) { }

    public getAllPokemons(pageSize: number): Observable<PokemonList> {
        return this.http.get<PokemonList>(`https://pokeapi.co/api/v2/pokemon?limit=${pageSize}`);
    }

    public getTotalNumberOfPokemons(): Observable<PokemonList> {
        return this.http.get<PokemonList>('https://pokeapi.co/api/v2/pokemon');
    }

    public getPokemonInfos(pokemonName: string): Observable<Pokemon> {
        return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    }

    public getFavouritesPokemonNumber() {
        return this.favouritePokemons.length;
    }
}