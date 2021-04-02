import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from './services/pokemon.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public numberOfFavouritePokemons: number;

  constructor(private readonly router: Router, private pokemonService: PokemonService) { }

  public ngOnInit(): void {
    this.numberOfFavouritePokemons = this.pokemonService.getFavouritesPokemonNumber();
  }
  public onGoToSettings(): void {
    this.router.navigate(['/settings'])
  }

  public onGoToWelcomePage(): void {
    this.router.navigate(['/'])
  }

}

