import {WeatherData} from '../../types/WeatherData';
import {BaseAction} from '../../types/BaseAction';
import {ActionTypes} from './ActionTypes.constants';

const getWeatherForCity = (city: string, units?: string): BaseAction => ({
  type: ActionTypes.GET_WEATHER_FOR_CITY,
  payload: {city, units},
});

const getWeatherForCities = (
  cities: Set<number>,
  units?: string,
): BaseAction => ({
  type: ActionTypes.GET_WEATHER_FOR_CITIES,
  payload: {cities, units},
});

const setWeatherInfoForCities = (
  data: Map<number, WeatherData>,
): BaseAction => ({
  type: ActionTypes.SET_WEATHER_FOR_CITIES,
  payload: data,
});

export const weatherActions = {
  getWeatherForCity,
  getWeatherForCities,
  setWeatherInfoForCities,
};
