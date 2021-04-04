import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public isDarkThemeLabel = 'Dark Theme';

  public isLightThemeLabel = 'Light Theme';

  public isDarkTheme: boolean;

  public pageSize: number;

  public form: FormGroup;

  constructor(
    private readonly router: Router,
    private formBuilder: FormBuilder,
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      items: ['',],
      slider: [false]
    });
  }

  public onGoBack(): void {
    this.router.navigate(['/']);
  }

  public onValidate(): void {
    this.applyNumberOfItems(this.form.get('items').value);
    this.form.get('slider').value ? this.applyDarkTheme() : this.applyLightTheme();
  }

  public onToggle(event) {
    this.isDarkTheme = event.checked;
  }

  public applyDarkTheme() {
    console.log('apply dark theme');
  }

  public applyLightTheme() {
    console.log('apply light theme');
  }

  public applyNumberOfItems(items: number) {
    this.pokemonService.pageSize = items;
    localStorage.setItem('itemsPerPage', items.toLocaleString());
    console.log(items);
  }

}
