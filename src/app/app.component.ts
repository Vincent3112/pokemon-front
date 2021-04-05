import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PokemonService } from './services/pokemon.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public numberOfFavouritePokemons: Observable<number>;

  constructor(private readonly router: Router, private readonly pokemonService: PokemonService) { }

  public ngOnInit(): void {
    setTimeout(() => this.numberOfFavouritePokemons = this.pokemonService.favouritePokemonsNumber, 400);
  }

  public onGoToSettings(): void {
    this.router.navigate(['/settings'])
  }

  public onGoToWelcomePage(): void {
    this.router.navigate(['/'])
  }
}

