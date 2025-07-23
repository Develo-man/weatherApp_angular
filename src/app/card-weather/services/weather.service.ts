import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, interval, switchMap, of } from 'rxjs';
import { map, catchError, filter } from 'rxjs/operators';
import { CITIES } from '../constants/cities.constant';
import { WeatherData } from '../models/application.model';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  selectedCities: string[] = [];
  private API_KEY = environment.openWeatherApiKey;
  private API_LANG = 'en';

  constructor(private http: HttpClient) {}

  private validateWeatherData(data: any): WeatherData | null {
    if (!data || !data.id || !data.name || !data.main?.temp || !data.weather?.[0]) {
      return null;
    }
    
    return {
      id: Number(data.id),
      name: String(data.name),
      main: { temp: Number(data.main.temp) },
      weather: [{
        description: String(data.weather[0].description || ''),
        icon: String(data.weather[0].icon || '')
      }]
    };
  }

  getWeatherData(): Observable<WeatherData[]> {
    const weatherDataFetch$: Observable<WeatherData | null>[] = [];

    for (const city of this.selectedCities) {
      // Walidacja nazwy miasta
      if (!city || typeof city !== 'string') {
        continue;
      }

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&lang=${this.API_LANG}&appid=${this.API_KEY}&units=metric`;

      const weatherDataRequest$ = this.http.get<any>(url).pipe(
        map(data => this.validateWeatherData(data)),
        catchError(error => {
          console.error(`Błąd pobierania danych dla ${city}:`, error);
          return of(null);
        })
      );
      
      weatherDataFetch$.push(weatherDataRequest$);
    }

    if (weatherDataFetch$.length === 0) {
      return of([]);
    }
    
    return forkJoin(weatherDataFetch$).pipe(
      map(results => results.filter((data): data is WeatherData => data !== null))
    );
  }

  getWeatherDataWithInterval(intervalInSeconds: number): Observable<WeatherData[]> {
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

  getRandomCityAndWeatherWithInterval(intervalInMinutes: number): Observable<WeatherData[]> {
    return interval(intervalInMinutes * 60000).pipe(
      switchMap(() => {
        this.getRandomCity();
        return this.getWeatherData();
      })
    );
  }
}