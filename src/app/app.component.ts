import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PokemonService } from './services/pokemon.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public numberOfFavouritePokemons: Observable<number>;

  constructor(private readonly router: Router, private pokemonService: PokemonService) { }

  public ngOnInit(): void {
    this.numberOfFavouritePokemons = localStorage.getItem('favouritesNumber') ? of(JSON.parse(localStorage.getItem('favouritesNumber'))) : this.pokemonService.favouritePokemonsNumber;
  }

  public onGoToSettings(): void {
    this.router.navigate(['/settings'])
  }

  public onGoToWelcomePage(): void {
    this.router.navigate(['/'])
  }

}

