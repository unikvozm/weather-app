import {call, put, takeEvery} from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import {useSelector} from 'react-redux';
import {BaseAction} from '../../types/BaseAction';
import {
  WeatherDataFetched,
  WeatherData,
  WeatherListDataFetched,
} from '../../types/WeatherData';
import {weatherApi} from '../api/weather.api';
import {Store} from '../reducers/root.reducer';
import {converWeatherData} from '../../utils/convertWeatherData';
import {weatherActions} from '../actions/weather.actions';
import {errorActions} from '../actions/error.actions';
import {ActionTypes} from '../actions/ActionTypes.constants';

export function* getWeatherForCity(action: BaseAction) {
  try {
    const {city, units} = action.payload;
    const fetchedData: WeatherDataFetched = yield call(
      weatherApi.getWeatherByCityName,
      city,
      units,
    );
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const weather = useSelector((state: Store) => state.weather.weather);
    const convertedData: WeatherData = converWeatherData(fetchedData);
    const newWeather = new Map(weather);
    newWeather.set(convertedData.id, convertedData);
    yield put(weatherActions.setWeatherInfoForCities(newWeather));
    const cities = new Set(...JSON.parse(yield AsyncStorage.getItem('cities')));
    cities.add(convertedData.id);
    yield AsyncStorage.setItem('cities', JSON.stringify([...cities]));
  } catch (error) {
    yield put(
      errorActions.setErrorMessage(error.message || "Can't find the city"),
    );
  }
}

export function* getWeatherForCities(action: BaseAction) {
  try {
    const {cities, units} = action.payload;
    const fetchedData: WeatherListDataFetched = yield call(
      weatherApi.getWeatherByCityIds,
      [...cities.values()],
      units,
    );
    const convertedData: WeatherData[] = fetchedData.list.map((data) =>
      converWeatherData(data),
    );
    const newWeather = new Map();
    const newCities = new Set();
    convertedData.forEach((data) => {
      newWeather.set(data.id, data);
      newCities.add(data.id);
    });
    yield put(weatherActions.setWeatherInfoForCities(newWeather));
    yield AsyncStorage.setItem('cities', JSON.stringify([...cities]));
  } catch (error) {
    yield put(
      errorActions.setErrorMessage(error.message || "Can't load weather data"),
    );
  }
}

export function* weatherWatcher() {
  yield takeEvery(ActionTypes.GET_WEATHER_FOR_CITY, getWeatherForCity);
  yield takeEvery(ActionTypes.GET_WEATHER_FOR_CITIES, getWeatherForCities);
}
