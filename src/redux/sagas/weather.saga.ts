import {call, put, takeEvery, select, delay} from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import {BaseAction} from '../../types/BaseAction';
import {
  WeatherDataFetched,
  WeatherData,
  WeatherListDataFetched,
} from '../../types/WeatherData';
import {weatherApi} from '../api/weather.api';
import {converWeatherData} from '../../utils/convertWeatherData';
import {weatherActions} from '../actions/weather.actions';
import {errorActions} from '../actions/error.actions';
import {ActionTypes} from '../actions/ActionTypes.constants';
import {weatherSelector} from '../selectors/weather.selector';

export function* getWeatherForCity(action: BaseAction) {
  try {
    const {city, units} = action.payload;
    const citiesName = yield select(weatherSelector.getCitiesName());
    if (
      citiesName
        .map((name: string) => name.toLowerCase())
        .includes(city.toLowerCase())
    )
      throw new Error(`${city.toUpperCase()} is already in the list`);
    const fetchedData: WeatherDataFetched = yield call(
      weatherApi.getWeatherByCityName,
      city,
      units,
    );
    const convertedData: WeatherData = converWeatherData(fetchedData);
    const weather = yield select(weatherSelector.getWeather);
    const newWeather = [...weather, convertedData];
    yield put(weatherActions.setWeatherInfoForCities(newWeather));
    const cities = yield select(weatherSelector.getCitiesId());
    yield AsyncStorage.setItem('cities', JSON.stringify(cities));
    yield put(errorActions.setErrorMessage(''));
  } catch (error) {
    console.log(error);
    let message = error.message;
    if (message === 'Request failed with status code 404')
      message = "Can't find the city";
    yield put(errorActions.setErrorMessage(message));
    yield delay(5000);
    yield put(errorActions.setErrorMessage(''));
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
    yield put(weatherActions.setWeatherInfoForCities(convertedData));
    const citiesId = yield select(weatherSelector.getCitiesId());
    yield AsyncStorage.setItem('cities', JSON.stringify(citiesId));
    yield put(errorActions.setErrorMessage(''));
  } catch (error) {
    console.log(error);
    yield put(errorActions.setErrorMessage("Can't load weather data"));
  }
}

export function* weatherWatcher() {
  yield takeEvery(ActionTypes.GET_WEATHER_FOR_CITY, getWeatherForCity);
  yield takeEvery(ActionTypes.GET_WEATHER_FOR_CITIES, getWeatherForCities);
}
