import {createSelector} from 'reselect';
import {Store} from '../reducers/root.reducer';
import {WeatherData} from '../../types/WeatherData';
import {Units} from '../../types/Units.type';

const getWeather = (state: Store): WeatherData[] => state.weather.weather;

const getCitiesName = () =>
  createSelector(getWeather, (weather): string[] =>
    weather.map((city) => city.name),
  );

const getCitiesId = () =>
  createSelector(getWeather, (weather): number[] =>
    weather.map((city) => city.id),
  );

const getCityWeather = (cityId: number) =>
  createSelector(
    getWeather,
    (weather): WeatherData => weather.filter((city) => city.id === cityId)[0],
  );

const getWeatherUnits = (state: Store): Units => state.weather.units;

export const weatherSelector = {
  getWeather,
  getCitiesName,
  getCitiesId,
  getCityWeather,
  getWeatherUnits,
};
