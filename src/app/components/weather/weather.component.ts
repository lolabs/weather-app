import { Component, OnInit } from '@angular/core';
import {WeatherApiService} from '../../services/weather-api.service';
import { } from '@types/googlemaps';
import {HttpClient} from '@angular/common/http';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  weatherInfo: any;
  coordinates: any;
  currentCity: string;
  temperature: string;
  forecastInfo: any;
  invalidInput: boolean;
  showDetails: boolean;

  constructor(public weatherApi: WeatherApiService, public http: HttpClient, public spinnerService: Ng4LoadingSpinnerService) { }
  public temp_unit = "ºC";

  ngOnInit() {
  }

  getWeatherByLocation(city: string) {
    this.spinnerService.show();
    if (city.length === 0) {
      alert("Please insert a city");
      this.invalidInput = true;
    }
    this.weatherApi.getByCityName(city).subscribe((results) => {
      this.weatherInfo = results;
      this.currentCity = " ";
      this.spinnerService.hide();
      this.temperature = this.weatherInfo.weather;
    }, (err) => {
      this.spinnerService.hide();
      //@TODO error alerts
      console.log(err.msg);
    });
  }



  getCurrentLocation(location) {
    // clear input field
    location.value = "";
    this.spinnerService.show();
    let geolocation = navigator.geolocation.getCurrentPosition((res) => {
      this.coordinates = res.coords;
      let latLon = this.coordinates.latitude + ',' + this.coordinates.longitude;
      this.setCityName(latLon);
      this.weatherApi.getByLocation(this.coordinates.latitude, this.coordinates.longitude).subscribe((resp) => {
        this.weatherInfo = resp;
        this.spinnerService.hide();
        //@TODO error alerts
        console.log(this.weatherInfo);
      }, (err) => {
        //@TODO error alerts
        console.log(err);
        this.spinnerService.hide();

      });
    });
  }

  setCityName(latLon) {
    this.weatherApi.getCityName(latLon).subscribe((locations) => {
      if (locations.results.length > 0) {
        this.currentCity = locations.results[0].formatted_address;
      } else {
        //@TODO error alerts
        console.log("error");
      }

    }, (error) => {
      //@TODO error alerts
      console.log(error.msg);
    });
  }

  toggleDetails(){
    this.showDetails = !this.showDetails;
  }
}