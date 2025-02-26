import dotenv from 'dotenv';
dotenv.config();

interface WeatherData {
  temperature: number;
  humidity: number;
  description: string;
}

class WeatherService {
  private apiBaseUrl = process.env.API_BASE_URL; // 
  private apiKey = process.env.API_KEY;
  private forecastEndpoint = '/data/2.5/forecast';

  constructor() {
    if (!this.apiBaseUrl || !this.apiKey) {
      throw new Error('API_BASE_URL or API_KEY is not defined in environment variables.');
    }
  }

  /**
   * Build the forecast query URL using the provided city name.   */
  private buildForecastQuery(city: string): string {
    return `${this.apiBaseUrl}${this.forecastEndpoint}?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=metric`;
  }

  /**
   * Retrieve weather data for a given city.
   * The method uses the forecast API endpoint where the first forecast item is used as current weather.
   */
  async getWeatherForCity(city: string): Promise<{ current: WeatherData; forecast: WeatherData[] }> {
    const url = this.buildForecastQuery(city);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    const data = await response.json();

    // Assume the first entry represents current weather conditions
    const firstEntry = data.list[0];
    const current: WeatherData = {
      temperature: firstEntry.main.temp,
      humidity: firstEntry.main.humidity,
      description: firstEntry.weather[0].description,
    };

    // Map forecast entries into a simplified array of WeatherData objects
    const forecast: WeatherData[] = data.list.map((entry: any) => ({
      temperature: entry.main.temp,
      humidity: entry.main.humidity,
      description: entry.weather[0].description,
    }));

    return { current, forecast };
  }
}

export default new WeatherService();
