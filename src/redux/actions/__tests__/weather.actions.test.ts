import { ActionTypes } from "../ActionTypes.constants";
import { weatherActions } from "../weather.actions";

describe("WeatherActions work correctly", () => {
  test("getWeatherForCity works", () => {
    expect(weatherActions.getWeatherForCity('london')).toEqual({
      type: ActionTypes.GET_WEATHER_FOR_CITY,
      payload: { city: 'london', units: undefined }
    });
  });

  test("getWeatherForCities works", () => {
    const cities = new Set([1, 2, 3])
    expect(weatherActions.getWeatherForCities(cities)).toEqual({
      type: ActionTypes.GET_WEATHER_FOR_CITIES,
      payload: { cities, units: undefined }
    });
  });

  test("setWeatherInfoForCities works", () => {
    const data = new Map()
    expect(weatherActions.setWeatherInfoForCities(data)).toEqual({
      type: ActionTypes.SET_WEATHER_FOR_CITIES,
      payload: data
    });
  });
});