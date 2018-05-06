import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {WeatherApiService} from '../../services/weather-api.service';
import { } from '@types/googlemaps';
import {HttpClient} from '@angular/common/http';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {AppModule} from '../../app.module';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit{

  public weatherInfo: any;
  public coordinates: any;
  public currentCity: string;
  public temperature: string;
  public invalidInput: boolean;
  public showDetails: boolean;
  public dashboard = true;

  constructor(public weatherApi: WeatherApiService, public http: HttpClient, public spinnerService: Ng4LoadingSpinnerService) { }
  public temp_unit = "ºC";

  ngOnInit() {
  }

  /**
   * Gets the weather conditions using ApiService
   * with the given city name
   * @param {string} city
   */
  getWeatherByLocation(city: string) {
    if (city.length === 0) {
      alert("Field can not be empty. Please insert the name of location.");
      this.invalidInput = true;
      return;
    }
    this.toggleView();
    this.spinnerService.show();
    this.weatherApi.getByCityName(city).subscribe((results) => {
      this.weatherInfo = results;
      this.currentCity = " ";
      this.spinnerService.hide();
      this.temperature = this.weatherInfo.weather;
    }, (err) => {
      this.spinnerService.hide();
      //@TODO error alerts
      alert("Please try again. Insert a valid location.");
    });
  }


  /**
   * Gets the location, based on users browser location
   * @param location
   */
  getCurrentLocation(location) {
    this.toggleView();
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
      }, (err) => {
        //@TODO error alerts
        alert("Please try again. Insert a valid Location");
        this.spinnerService.hide();
      });
    });
  }

  /**
   * Sets the city name using google maps API
   * @TODO create a new service only for google maps API
   * @param latLon
   */
  setCityName(latLon) {
    this.weatherApi.getCityName(latLon).subscribe((locations) => {
      if (locations.results.length > 0) {
        this.currentCity = locations.results[0].formatted_address;
      } else {
        //@TODO error alerts
        alert("Please try again. Insert a valid coordinates. Make sure to enable the browser location.");
      }
    }, (error) => {
      //@TODO error alerts
      alert("Please try again. Insert a valid coordinates. Make sure to enable the browser location.");
    });
  }

  toggleDetails(){
    this.showDetails = !this.showDetails;
  }

  toggleView() {
    this.dashboard = false;
  }

  onSearchChange() {
    this.toggleView();
  }

  clearSearch() {
    this.spinnerService.show();
  }
}
