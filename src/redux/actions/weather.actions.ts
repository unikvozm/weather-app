import {WeatherData} from '../../types/WeatherData';
import {BaseAction} from '../../types/BaseAction';
import {Units} from '../../types/Units.type';
import {ActionTypes} from './ActionTypes.constants';

export type GET_WEATHER_FOR_CITY = string;
const getWeatherForCity = (city: string): BaseAction<GET_WEATHER_FOR_CITY> => ({
  type: ActionTypes.GET_WEATHER_FOR_CITY,
  payload: city,
});

export type GET_WEATHER_FOR_CITIES = {
  cities: number[];
  units?: Units;
};
const getWeatherForCities = (
  cities: number[],
  units?: Units,
): BaseAction<GET_WEATHER_FOR_CITIES> => ({
  type: ActionTypes.GET_WEATHER_FOR_CITIES,
  payload: {cities, units},
});

export type SET_WEATHER_FOR_CITIES = WeatherData[];
const setWeatherInfoForCities = (
  data: WeatherData[],
): BaseAction<SET_WEATHER_FOR_CITIES> => ({
  type: ActionTypes.SET_WEATHER_FOR_CITIES,
  payload: data,
});

export type SET_WEATHER_UNITS = Units;
const setWeatherUnits = (units: Units): BaseAction<SET_WEATHER_UNITS> => ({
  type: ActionTypes.SET_WEATHER_UNITS,
  payload: units,
});

const deleteCity = (cityId: number): BaseAction<number> => ({
  type: ActionTypes.DELETE_CITY,
  payload: cityId,
});

export const weatherActions = {
  getWeatherForCity,
  getWeatherForCities,
  setWeatherInfoForCities,
  deleteCity,
  setWeatherUnits,
};
