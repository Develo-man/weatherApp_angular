import { Component, OnInit } from '@angular/core';
import { Observable, merge, of } from 'rxjs';
import { WeatherService } from '../../services/weather.service';
import { WeatherData } from '../../models/application.model';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
})
export class WeatherCardComponent implements OnInit {
  weatherData$: Observable<WeatherData[]> = new Observable<WeatherData[]>();

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getRandomCity();
    this.weatherData$ = this.weatherService.getWeatherData();

    merge(
      this.weatherService.getWeatherDataWithInterval(10),
      this.weatherService.getRandomCityAndWeatherWithInterval(1)
    ).subscribe((data) => {
      this.weatherData$ = of(data);
    });
  }

  capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  getWeatherIconUrl(iconId: string): string {
    return `https://openweathermap.org/img/w/${iconId}.png`;
  }

  openCityWeatherPageUrl(id: number): void {
    window.open(`https://openweathermap.org/city/${id}`);
  }
}
