# WeatherApp

A beautiful, responsive weather application built with Angular that displays real-time weather information for multiple cities with an elegant glassmorphism design.

## ✨ Features

- **Real-time Weather Data**: Live weather information from OpenWeatherMap API
- **Dynamic City Selection**: Randomly rotates through 5 predefined cities (Lodz, Warsaw, Berlin, New York, London)
- **Auto-refresh**: Weather data updates every 10 seconds, cities rotate every minute
- **Glassmorphism UI**: Modern frosted glass design with subtle animations
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Accessibility**: ARIA labels and high contrast mode support
- **Performance**: Lazy loading images and reduced motion support

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- Angular CLI (`npm install -g @angular/cli`)
- OpenWeatherMap API key ([Get one free here](https://openweathermap.org/api))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd WeatherApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   Create `src/environment.ts` and add your API key:
   ```typescript
   export const environment = {
     production: false,
     openWeatherApiKey: 'YOUR_API_KEY_HERE'
   };
   ```

4. **Start the development server**
   ```bash
   ng serve
   ```
   Navigate to `http://localhost:4200/`

## 🏗️ Project Structure

```
src/
├── app/
│   ├── card-weather/           # Weather feature module
│   │   ├── components/         # Weather card component
│   │   ├── services/          # Weather API service
│   │   ├── models/            # TypeScript interfaces
│   │   └── constants/         # City definitions
│   └── ...
├── styles/                    # Global SCSS styles
│   └── base/                  # Base styles (colors, fonts, sizes)
└── assets/                    # Images and static files
```

## 🎨 Design System

The app uses a consistent design system built with SCSS:

- **Colors**: Defined in `src/styles/base/_colors.scss`
- **Typography**: Lato font family with responsive sizing
- **Layout**: CSS Grid with glassmorphism cards
- **Animations**: Smooth transitions and hover effects

## 🔧 Configuration

### Cities
Modify the cities list in `src/app/card-weather/constants/cities.constant.ts`:

```typescript
export const CITIES: ReadonlyArray<string> = [
  'Your City',
  'Another City',
  // Add more cities here
];
```

### Refresh Intervals
Adjust update frequencies in `weather-card.component.ts`:
- Weather data: Every 10 seconds
- City rotation: Every 1 minute

## 🛠️ Development

### Generate Components
```bash
ng generate component component-name
ng generate service service-name
```

### Build for Production
```bash
ng build --prod
```
Build artifacts will be stored in the `dist/` directory.

### Running Tests
```bash
ng test                 # Run unit tests
ng e2e                 # Run end-to-end tests
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔒 Security

The app includes Content Security Policy (CSP) headers to prevent XSS attacks and only allows connections to trusted weather API endpoints.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for the weather data API
- Background image from [Unsplash](https://unsplash.com/)
- Icons from OpenWeatherMap

## 🐛 Known Issues

- Weather icons may take a moment to load on slow connections
- City names are currently hardcoded (future enhancement: user selection)

---

**Need help?** Check the [Angular CLI documentation](https://angular.io/cli) or open an issue.