import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const WEATHER_API_URL = environment.weatherApiURL;
const WEATHER_API_KEY = environment.weatherApiKey;
const MAPS_API_URL = environment.googleMapsApiURL;
const MAPS_API_KEY = environment.googleMapsApiKey;

@Injectable()
export class WeatherApiService {
  constructor(public http: HttpClient) {
    console.log("weather api service started");
  }

  /**
   * Retrieves weather information by given city name
   * @param {string} city
   * @returns {Observable<any>}
   */
  getByCityName(city: string): Observable<any> {
    return this.http.get(WEATHER_API_URL + '?q=' + city + '&lang=' + this.getBrowserLanguage() + '&units=metric&APPID=' + WEATHER_API_KEY).map((result) => {
      return result;
    });
  }

  /**
   * Retrieves weather information by given latitude and longitude
   * @param lat
   * @param lon
   * @returns {Observable<any>}
   */
  getByLocation(lat: any, lon:any): Observable<any> {
    return this.http.get(WEATHER_API_URL + '?lat=' + lat + '&lon=' + lon + '&lang=' + this.getBrowserLanguage() + '&units=metric&APPID=' + WEATHER_API_KEY).map((result) => {
      return result;
    });
  }

  /**
   * Retrieves city name by given latitude and longitude
   * @param latLon
   * @returns {Observable<any>}
   */
  getCityName(latLon): Observable<any> {
    return this.http.get(MAPS_API_URL + '/geocode/json?latlng=' + latLon + '&sensor=false&' + MAPS_API_KEY).map((result) => {
      return result;
    });
  }

  /**
   * Retrieves the language based on browser configuration
   * @returns {string}
   */
  getBrowserLanguage() {
    return navigator.language.substring(0, 2);
  }
}
