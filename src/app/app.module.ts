import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {WeatherApiService} from './services/weather-api.service';
import { AppComponent } from './app.component';
import { WeatherComponent } from './components/weather/weather.component';
import {Ng4LoadingSpinnerModule} from 'ng4-loading-spinner';
import {NgCircleProgressModule} from 'ng-circle-progress';


@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    Ng4LoadingSpinnerModule,
    NgCircleProgressModule.forRoot({
      "space": -10,
      "outerStrokeWidth": 10,
      "outerStrokeColor": "#4882c2",
      "innerStrokeColor": "#e7e8ea",
      "innerStrokeWidth": 10,
      "animateTitle": true,
      "animationDuration": 1000,
      "showUnits": true,
      "showSubtitle": false,
      "showBackground": false,
      "clockwise": false,
      "class": "humidityElement"
    })
  ],
  providers: [WeatherApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
