import {WeatherData} from '../../types/WeatherData';
import {BaseAction} from '../../types/BaseAction';
import {ActionTypes} from '../actions/ActionTypes.constants';

export type WeatherState = {
  weather: WeatherData[];
};

const initialState: WeatherState = {
  weather: [],
};

export const weatherReducer = (state = initialState, action: BaseAction) => {
  switch (action.type) {
    case ActionTypes.SET_WEATHER_FOR_CITIES:
      return {...state, weather: action.payload};
    default:
      return state;
  }
};
