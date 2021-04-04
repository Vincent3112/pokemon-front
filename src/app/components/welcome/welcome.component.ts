import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { forkJoin, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PokemonAccessPoint } from '../../entities/pokemon-access-point.entity';
import { Pokemon } from '../../entities/pokemon.entity';
import { PokemonService } from '../../services/pokemon.service';
import { MatPaginator } from '@angular/material/paginator';
import { PokemonAbility } from '../../entities/pokemon-ability.entity';
import { Ability } from '../../entities/ability.entity';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {

  private readonly destroy$ = new Subject<void>();

  public localFavouritesPokemonList: string[] = [];

  public displayedColumns = ['name', 'addToFavourite'];

  public dataSource: PokemonAccessPoint[];

  public detailsPanelIsLoaded = true;

  public mainPanelIsLoaded = false;

  public isAlreadyFavouriteLabel = 'Remove from favourites';

  public isNotYetFavouriteLabel = 'Add to Favourite';

  public totalNumberOfPokemons: number;

  public isAPokemonSelected: boolean;

  public selectedPokemon: Pokemon;

  public selectedPokemonAbilities: PokemonAbility[] = [];

  public pageSize: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private pokemonService: PokemonService) { }

  public ngOnInit(): void {
    this.localFavouritesPokemonList = localStorage.getItem('localFavouritesPokemonList') ? JSON.parse(localStorage.getItem('localFavouritesPokemonList')) : [];
    this.mainPanelIsLoaded = false;
    this.pageSize = localStorage.getItem('itemsPerPage') ? JSON.parse(localStorage.getItem('itemsPerPage')) : 20;
    this.isAPokemonSelected = false;
    this.getPokemons(this.localFavouritesPokemonList);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSwitchPageSettings(pageSettings: any, localFavouritesPokemonList: string[]): void {
    this.pokemonService
      .getNumberOfPokemons(pageSettings.pageIndex * pageSettings.pageSize, pageSettings.pageSize)
      .subscribe((pokemons) => {
        this.dataSource = pokemons.results;
        this.dataSource.forEach((pokemon) => {
          localFavouritesPokemonList.forEach((favouritePokemonName) => {
            if (pokemon.name === favouritePokemonName) {
              pokemon.isFavourite = true;
            }
          })
        });
        this.pageSize = pageSettings.pageSize;
      })
  }

  public getPokemons(localFavouritesPokemonList?: string[]): void {
    this.pokemonService.getNumberOfPokemons(0, this.pageSize)
      .subscribe((allPokemons) => {
        this.totalNumberOfPokemons = allPokemons.count;
        this.dataSource = allPokemons.results;
        this.dataSource.forEach((pokemon) => {
          localFavouritesPokemonList?.forEach((favouritePokemonName) => {
            if (pokemon.name === favouritePokemonName) {
              pokemon.isFavourite = true;
            }
          })
        });
        setTimeout(() => this.mainPanelIsLoaded = true, 200);
      })
  }

  public onClickToAddFavourite(pokemon: PokemonAccessPoint): void {
    if (!pokemon.isFavourite) {
      this.pokemonService.favouritePokemons.push(pokemon.name);
      this.localFavouritesPokemonList.push(pokemon.name);
    } else {
      for (let i = 0; i < this.pokemonService.favouritePokemons.length; i++) {
        if (pokemon.name === this.pokemonService.favouritePokemons[i]) {
          this.pokemonService.favouritePokemons.splice(i, 1);
          this.localFavouritesPokemonList.splice(i, 1);
        }
      }
    }
    this.pokemonService.favouritePokemonsNumber.next(this.pokemonService.favouritePokemons.length);
    localStorage.setItem('favouritesNumber', JSON.stringify(this.pokemonService.favouritePokemons.length));
    localStorage.setItem('favourites', JSON.stringify(this.pokemonService.favouritePokemons));
    localStorage.setItem('localFavouritesPokemonList', JSON.stringify(this.localFavouritesPokemonList));
    pokemon.isFavourite = !pokemon.isFavourite;
  }

  public selectPokemon(pokemonName: string): void {
    this.detailsPanelIsLoaded = false;
    this.selectedPokemonAbilities = [];
    const httpResponses = [];

    const $pokemon = this.pokemonService.getPokemonInfos(pokemonName);

    $pokemon
      .pipe(takeUntil(this.destroy$))
      .subscribe((pokemon) => {
        this.isAPokemonSelected = true;
        this.selectedPokemon = pokemon;
      });

    $pokemon
      .pipe(takeUntil(this.destroy$))
      .subscribe((pokemon) => {
        pokemon.abilities.forEach((ability) => {
          httpResponses.push(this.pokemonService.getAbility(ability.ability.url));
        });
        forkJoin(httpResponses).subscribe(
          (abilities: Ability[]) => {
            abilities.forEach((ability) => {
              this.getEnglishDescriptionOfAbility(ability);
            })
          }
        )
      });
  }

  private getEnglishDescriptionOfAbility(ability: Ability): void {
    let abilityDescription = { name: ability.name, description: '' };
    ability.effect_entries.forEach(effectEntry => {
      if (effectEntry.language.name === 'en') {
        abilityDescription.description = effectEntry.short_effect;
      }
    });
    setTimeout(() => this.detailsPanelIsLoaded = true, 200);
    this.selectedPokemonAbilities.push(abilityDescription);
  }
}
