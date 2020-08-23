import {combineReducers} from 'redux';
import {weatherReducer, WeatherState} from './weather.reducer';
import {errorReducer, ErrorState} from './error.reducer';

export const rootReducer = combineReducers({
  weather: weatherReducer,
  error: errorReducer,
});

export interface Store {
  weather: WeatherState;
  error: ErrorState;
}
