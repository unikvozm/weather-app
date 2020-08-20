export type WeatherDataFetched = {
  coord: {lon: number; lat: number};
  weather: Weather[];
  base?: string;
  main: {
    temp: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
  };
  visibility: number;
  wind: {speed: number; deg: number};
  clouds: {all: number};
  dt: number;
  sys?: {
    type?: number;
    id?: number;
    message?: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  id: number;
  name: string;
  cod?: number;
};

type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type WeatherListDataFetched = {
  cnt: number;
  list: WeatherDataFetched[];
};

export type WeatherData = {
  id: number;
  name: string;
  icon: string;
  description: string;
  weather: string;
  temp: number;
  pressure: number;
  humidity: number;
  windSpeed: number;
  cloudsCover: number;
  visibility: number;
};
