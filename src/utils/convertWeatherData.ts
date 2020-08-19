import {WeatherDataFetched, WeatherData} from '../types/WeatherData';

export const converWeatherData = (data: WeatherDataFetched): WeatherData => ({
  id: data.id,
  name: data.name,
  icon: data.weather[0].icon,
  description: data.weather[0].description,
  weather: data.weather[0].main,
  temp: data.main.temp,
  pressure: data.main.pressure,
  humidity: data.main.humidity,
  windSpeed: data.wind.speed,
  cloudsCover: data.clouds.all,
  visibility: data.visibility,
});
