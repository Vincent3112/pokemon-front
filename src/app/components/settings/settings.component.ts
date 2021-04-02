import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public theme: string;

  public pageSize: number;

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }

  public onGoBack(): void {
    this.router.navigate(['/']);
  }

  public onValidate(): void {
    
  }

}
