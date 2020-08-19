import {combineReducers} from 'redux';
import {weatherReducer, WeatherState} from './weather.reducer';

export const rootReducer = combineReducers({
  weather: weatherReducer,
});

export interface Store {
  weather: WeatherState;
}
