import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, interval, switchMap } from 'rxjs';
import { CITIES } from '../constants/cities.constant';
import { WeatherData } from '../models/application.model';


@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  selectedCities: string[] = [];
  private API_KEY = '6a3bf40735a0ef5beab29299d313af39';
  private API_LANG = 'en';

  constructor(private http: HttpClient) {}

  getWeatherData(): Observable<WeatherData[]> {
    const weatherDataFetch$: Observable<WeatherData>[] = [];

    for (let i = 0; i < this.selectedCities.length; i++) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.selectedCities[i]}&lang=${this.API_LANG}&appid=${this.API_KEY}&units=metric`;

      const weatherDataRequest$ = this.http.get<WeatherData>(url);
      weatherDataFetch$.push(weatherDataRequest$);
    }
    return forkJoin(weatherDataFetch$);
  }

  getWeatherDataWithInterval(
    intervalInSeconds: number
  ): Observable<WeatherData[]> {
    return interval(intervalInSeconds * 1000).pipe(
      switchMap(() => this.getWeatherData())
    );
  }

  getRandomCity(): string[] {
    for (let i = 0; i < 3; i++) {
      let remainingCities = CITIES.filter(
        (city) => !this.selectedCities.includes(city)
      );

      if (remainingCities.length < 3) {
        remainingCities = [...CITIES];
        this.selectedCities = [];
      }

      const randomIndex = Math.floor(Math.random() * remainingCities.length);
      const randomCity = remainingCities[randomIndex];
      this.selectedCities.push(randomCity);
    }

    return this.selectedCities;
  }
  getRandomCityAndWeatherWithInterval(
    intervalInMinuts: number
  ): Observable<WeatherData[]> {
    return interval(intervalInMinuts * 60000).pipe(
      switchMap(() => (this.getRandomCity(), this.getWeatherData()))
    );
  }
}
