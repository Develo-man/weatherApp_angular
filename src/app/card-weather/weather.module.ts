import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherCardComponent } from './compontens/weather-card/weather-card.component';

@NgModule({
  declarations: [WeatherCardComponent],
  imports: [CommonModule, FormsModule],
  exports: [WeatherCardComponent],
})
export class WeatherModule {}
