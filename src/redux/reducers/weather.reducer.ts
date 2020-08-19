import {WeatherData} from '../../types/WeatherData';
import {BaseAction} from '../../types/BaseAction';
import {ActionTypes} from '../actions/ActionTypes.constants';

export type WeatherState = {
  weather: Map<number, WeatherData>;
};

const initialState: WeatherState = {
  weather: new Map(),
};

export const weatherReducer = (state = initialState, action: BaseAction) => {
  switch (action.type) {
    case ActionTypes.SET_WEATHER_FOR_CITIES:
      return {...state, weather: new Map(action.payload)};
    default:
      return state;
  }
};
