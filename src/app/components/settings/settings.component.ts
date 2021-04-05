import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  private selectedTheme: string;

  private darkTheme = 'dark-theme';

  private lightTheme = 'light-theme';

  public isDarkThemeLabel = 'Dark Theme';

  public isLightThemeLabel = 'Light Theme';

  public isDarkTheme: boolean;

  public pageSize: number;

  public form: FormGroup;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private formBuilder: FormBuilder,
    private pokemonService: PokemonService
  ) { }

  public ngOnInit(): void {
    this.fetchData();
    this.form = this.formBuilder.group({
      items: ['', Validators.required],
      slider: [this.isDarkTheme]
    });
  }

  private fetchData(): void {
    this.pokemonService.favouritePokemons = localStorage.getItem('favourites') ? JSON.parse(localStorage.getItem('favourites')) : [];
    this.pokemonService.favouritePokemonsNumber.next(localStorage.getItem('favouritesNumber') ? JSON.parse(localStorage.getItem('favouritesNumber')) : 0);
    this.selectedTheme = localStorage.getItem('theme') ? JSON.parse(localStorage.getItem('theme')) : this.lightTheme;
    this.isDarkTheme = this.selectedTheme === this.darkTheme;
    this.applyTheme(this.selectedTheme);
  }

  public onValidate(): void {
    this.applyNumberOfItems(this.form.get('items').value ? this.form.get('items').value : 20);
    this.form.get('slider').value ? this.applyTheme(this.darkTheme) : this.applyTheme(this.lightTheme);
  }

  public onToggle(event) {
    this.isDarkTheme = event.checked;
  }

  public applyTheme(themeToApply: string) {
    const themetoRemove = themeToApply === this.lightTheme ? this.darkTheme : this.lightTheme;
    this.document.body.classList.remove(themetoRemove);
    this.document.body.classList.add(themeToApply);
    localStorage.setItem('theme', JSON.stringify(themeToApply));
  }

  public applyNumberOfItems(items: number) {
    localStorage.setItem('itemsPerPage', JSON.stringify(items));
  }

}
