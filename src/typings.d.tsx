export interface UserMessage {
  role: string;
  content: string;
}

export interface ApiResponse {
  status: number;
  data: any;
}

export interface WeatherStats {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
}