import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PokemonAccessPoint } from '../../entities/pokemon-access-point.entity';
import { Pokemon } from '../../entities/pokemon.entity';
import { PokemonService } from '../../services/pokemon.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {

  displayedColumns = ['name', 'addToFavourite'];

  pokemonsAccessPoints: MatTableDataSource<PokemonAccessPoint>;

  private readonly destroy$ = new Subject<void>();

  public isAlreadyFavouriteLabel = 'Remove from favourites';

  public isNotYetFavouriteLabel = 'Add to Favourite';

  public totalNumberOfPokemons: number;

  public isAPokemonSelected: boolean;

  public selectedPokemon: Pokemon;

  public pageSize: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private pokemonService: PokemonService) { }

  public ngOnInit(): void {
    this.pageSize = 20;
    this.isAPokemonSelected = false;
    this.getTotalNumberOfPokemons();
    this.getAllPokemons(this.pageSize);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getTotalNumberOfPokemons(): void {
    this.pokemonService
      .getTotalNumberOfPokemons()
      .pipe(takeUntil(this.destroy$))
      .subscribe((pokemonList) => {
        this.totalNumberOfPokemons = pokemonList.count
      });
  }

  public getAllPokemons(pageSize: number): void {
    this.pokemonService
      .getAllPokemons(pageSize)
      .pipe(takeUntil(this.destroy$))
      .subscribe((pokemonList) => {
        this.pokemonsAccessPoints = new MatTableDataSource(pokemonList.results);
      });
  }

  public onClickToAddFavourite(pokemon: PokemonAccessPoint): void {
    pokemon.isFavourite = !pokemon.isFavourite;
    this.pokemonService.favouritePokemons.push(pokemon.name);
  }

  public selectPokemon(pokemonName: string): void {
    this.pokemonService
      .getPokemonInfos(pokemonName)
      .pipe(takeUntil(this.destroy$))
      .subscribe((pokemon) => {
        this.isAPokemonSelected = true;
        this.selectedPokemon = pokemon;
      });
  }
}
