import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Pokemon } from '../../entities/pokemon.entity';
import { PokemonService } from '../../services/pokemon.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {

  public ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  ];

  public displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  public dataSource = this.ELEMENT_DATA;

  private readonly destroy$ = new Subject<void>();

  public totalNumberOfPokemons: number;

  public pokemons: Pokemon[];

  constructor(private readonly pokemonService: PokemonService) { }

  public ngOnInit(): void {
    this.getTotalNumberOfPokemons();
    this.getAllPokemons();
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

  public getAllPokemons(): void {
    this.pokemonService
      .getAllPokemons()
      .pipe(takeUntil(this.destroy$))
      .subscribe((pokemonList) => {
        this.pokemons = pokemonList.results
      });
  }
}
