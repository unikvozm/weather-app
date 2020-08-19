import { ActionTypes } from "../../actions/ActionTypes.constants";
import { weatherReducer } from "../weather.reducer";
import { WeatherData } from "../../../types/WeatherData";

describe("weatherReducer", () => {
  const oldWeather = new Map();
  const state = { weather: oldWeather };

  test("set weather for cities", () => {
    const data: WeatherData = {
      id: 1,
      name: "london",
      icon: "icon",
      description: "clear",
      weather: "clear",
      temp: 10,
      pressure: 10,
      humidity: 10,
      windSpeed: 10,
      cloudsCover: 10,
      visibility: 10,
    };

    const newWeather = oldWeather.set(data.id, data)

    const action = {
      type: ActionTypes.SET_WEATHER_FOR_CITIES,
      payload: newWeather
    };


    expect(weatherReducer(undefined, action)).toEqual({ weather: newWeather });
  });

});