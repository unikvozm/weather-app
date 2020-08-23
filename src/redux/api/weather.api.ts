import axios from 'axios';
import {
  WeatherDataFetched,
  WeatherListDataFetched,
} from '../../types/WeatherData';
import {Units} from '../../types/Units.type';

const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/';
const WEATHER_API_KEY = '248e45bb116e81485c9d564c722542b5';

async function getWeatherByCityName(
  city: string,
  units: Units = 'metric',
): Promise<WeatherDataFetched> {
  const api = `${BASE_WEATHER_URL}weather?q=${city}&units=${units}&appid=${WEATHER_API_KEY}`;
  const res = await axios.get(api);
  return res.data;
}

async function getWeatherByCityIds(
  cities: number[],
  units: Units = 'metric',
): Promise<WeatherListDataFetched> {
  const api = `${BASE_WEATHER_URL}group?id=${cities}&units=${units}&appid=${WEATHER_API_KEY}`;
  const res = await axios.get(api);
  return res.data;
}

export const weatherApi = {
  getWeatherByCityName,
  getWeatherByCityIds,
};
