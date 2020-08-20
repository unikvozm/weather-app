// import {WEATHER_API_KEY} from 'react-native-dotenv';
import axios from 'axios';
import {
  WeatherDataFetched,
  WeatherListDataFetched,
} from '../../types/WeatherData';

const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/';
const WEATHER_API_KEY = '248e45bb116e81485c9d564c722542b5';

async function getWeatherByCityName(
  city: string,
  units: string = 'metric',
): Promise<WeatherDataFetched> {
  const api = `${BASE_WEATHER_URL}weather?q=${city}&units=${units}&appid=${WEATHER_API_KEY}`;
  const res = await axios.get(api);
  return res.data;
}

export async function getWeatherByCityIds(
  cities: string[],
  units: string = 'metric',
): Promise<WeatherListDataFetched> {
  const api = `${BASE_WEATHER_URL}group?id=${cities}&units=${units}&appid=${WEATHER_API_KEY}`;
  const res = await axios.get(api);
  return res.data;
}

export const weatherApi = {
  getWeatherByCityName,
  getWeatherByCityIds,
};
