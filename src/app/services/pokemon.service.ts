import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PokemonList } from "../entities/pokemon-list.entity";

@Injectable({
    providedIn: 'root'
})
export class PokemonService {

    constructor(private readonly http: HttpClient) {}

    public getAllPokemons() : Observable<PokemonList> {
        return this.http.get<PokemonList>('https://pokeapi.co/api/v2/pokemon?limit=1118');
    }

    public getTotalNumberOfPokemons() : Observable<PokemonList> {
        return this.http.get<PokemonList>('https://pokeapi.co/api/v2/pokemon');
    }
}