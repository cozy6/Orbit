import axios from 'axios';
import { WeatherStats } from '../typings.d' ;

export async function fetchWeather(city: string): Promise<WeatherStats | null> {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(apiUrl);
    return response.data as WeatherStats;
  } catch (error) {
    console.error('Error fetching weather:', error);
    return null;
  }
}
