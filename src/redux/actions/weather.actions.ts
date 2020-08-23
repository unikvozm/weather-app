import {WeatherData} from '../../types/WeatherData';
import {BaseAction} from '../../types/BaseAction';
import {ActionTypes} from './ActionTypes.constants';

const getWeatherForCity = (city: string, units?: string): BaseAction => ({
  type: ActionTypes.GET_WEATHER_FOR_CITY,
  payload: {city, units},
});

const getWeatherForCities = (cities: number[], units?: string): BaseAction => ({
  type: ActionTypes.GET_WEATHER_FOR_CITIES,
  payload: {cities, units},
});

const setWeatherInfoForCities = (data: WeatherData[]): BaseAction => ({
  type: ActionTypes.SET_WEATHER_FOR_CITIES,
  payload: data,
});

const deleteCity = (cityId: number): BaseAction => ({
  type: ActionTypes.DELETE_CITY,
  payload: cityId,
});

export const weatherActions = {
  getWeatherForCity,
  getWeatherForCities,
  setWeatherInfoForCities,
  deleteCity,
};
