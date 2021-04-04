import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Ability } from "../entities/ability.entity";
import { PokemonList } from "../entities/pokemon-list.entity";
import { Pokemon } from "../entities/pokemon.entity";

@Injectable({
    providedIn: 'root'
})
export class PokemonService {

    public favouritePokemons: string[] = [];

    public pageSize: number;

    public favouritePokemonsNumber = new BehaviorSubject<number>(0);

    constructor(private readonly http: HttpClient) { }

    public getNumberOfPokemons(start: number, end: number): Observable<PokemonList> {
        return this.http.get<PokemonList>(`https://pokeapi.co/api/v2/pokemon/?offset=${start}&limit=${end}`);
    }

    public getPokemons(): Observable<PokemonList> {
        return this.http.get<PokemonList>('https://pokeapi.co/api/v2/pokemon');
    }

    public getPokemonInfos(pokemonName: string): Observable<Pokemon> {
        return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    }

    public getAbility(ability: string): Observable<Ability> {
        return this.http.get<Ability>(ability);
    }
}