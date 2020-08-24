import {ActionTypes} from '../ActionTypes.constants';
import {weatherActions} from '../weather.actions';
import {WeatherData} from '../../../types/WeatherData';

describe('WeatherActions work correctly', () => {
  test('getWeatherForCity works', () => {
    expect(weatherActions.getWeatherForCity('london')).toEqual({
      type: ActionTypes.GET_WEATHER_FOR_CITY,
      payload: 'london',
    });
  });

  test('getWeatherForCities works', () => {
    const cities = [1, 2, 3];
    expect(weatherActions.getWeatherForCities(cities)).toEqual({
      type: ActionTypes.GET_WEATHER_FOR_CITIES,
      payload: {cities, units: undefined},
    });
  });

  test('setWeatherInfoForCities works', () => {
    const data: WeatherData[] = [];
    expect(weatherActions.setWeatherInfoForCities(data)).toEqual({
      type: ActionTypes.SET_WEATHER_FOR_CITIES,
      payload: data,
    });
  });
});
