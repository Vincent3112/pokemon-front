import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material/material.module';
import { AppRoutingModule } from './app.routing.module';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PokemonService } from './services/pokemon.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TitleCasePipe } from './shared/pipes/title-case.pipe';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    SettingsComponent,
    TitleCasePipe
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [PokemonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
