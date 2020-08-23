import {WeatherData} from '../../types/WeatherData';
import {BaseAction} from '../../types/BaseAction';
import {ActionTypes} from '../actions/ActionTypes.constants';
import {Units} from '../../types/Units.type';

export type WeatherState = {
  weather: WeatherData[];
  units: Units;
};

const initialState: WeatherState = {
  weather: [],
  units: 'metric',
};

export const weatherReducer = (
  state = initialState,
  action: BaseAction<WeatherData[] | Units>,
) => {
  switch (action.type) {
    case ActionTypes.SET_WEATHER_FOR_CITIES:
      return {...state, weather: action.payload};
    case ActionTypes.SET_WEATHER_UNITS:
      return {...state, units: action.payload};
    default:
      return state;
  }
};
