import { Component } from '@angular/core';
import {Ng4LoadingSpinnerComponent, Ng4LoadingSpinnerService} from 'ng4-loading-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weather app';
  constructor(public spinnerService: Ng4LoadingSpinnerService) {};
}
