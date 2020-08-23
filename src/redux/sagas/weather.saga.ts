import {
  call,
  put,
  takeEvery,
  select,
  delay,
  takeLatest,
} from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import {BaseAction} from '../../types/BaseAction';
import {
  WeatherDataFetched,
  WeatherData,
  WeatherListDataFetched,
} from '../../types/WeatherData';
import {weatherApi} from '../api/weather.api';
import {converWeatherData} from '../../utils/convertWeatherData';
import {
  weatherActions,
  GET_WEATHER_FOR_CITY,
  GET_WEATHER_FOR_CITIES,
} from '../actions/weather.actions';
import {errorActions} from '../actions/error.actions';
import {ActionTypes} from '../actions/ActionTypes.constants';
import {weatherSelector} from '../selectors/weather.selector';
import {MAX_CITIES_NUMBER} from '../../constants/weather.constants';

export function* getWeatherForCity(action: BaseAction<GET_WEATHER_FOR_CITY>) {
  try {
    const city = action.payload;
    const units = yield select(weatherSelector.getWeatherUnits);
    const citiesName = yield select(weatherSelector.getCitiesName());
    if (
      citiesName
        .map((name: string) => name.toLowerCase())
        .includes(city?.toLowerCase())
    )
      throw new Error(`${city?.toUpperCase()} is already in the list`);
    if (citiesName.length === MAX_CITIES_NUMBER)
      throw new Error(`You can't add more cities`);

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

export function* getWeatherForCities(
  action: BaseAction<GET_WEATHER_FOR_CITIES>,
) {
  try {
    const {cities} = action.payload;
    let {units} = action.payload;
    if (!units) units = 'metric';
    yield put(weatherActions.setWeatherUnits(units));
    const fetchedData: WeatherListDataFetched = yield call(
      weatherApi.getWeatherByCityIds,
      cities,
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
    yield delay(5000);
    yield put(errorActions.setErrorMessage(''));
  }
}

export function* deleteCity(action: BaseAction<number>) {
  try {
    const cityId = action.payload;
    const weatherData = yield select(weatherSelector.getWeather);
    const newData = weatherData.filter(
      (city: WeatherData) => city.id !== cityId,
    );
    yield put(weatherActions.setWeatherInfoForCities(newData));
    const citiesId = yield select(weatherSelector.getCitiesId());
    yield AsyncStorage.setItem('cities', JSON.stringify(citiesId));
    yield put(errorActions.setErrorMessage(''));
  } catch (error) {
    console.log(error);
    yield put(errorActions.setErrorMessage("Can't delete this city"));
    yield delay(5000);
    yield put(errorActions.setErrorMessage(''));
  }
}

export function* weatherWatcher() {
  yield takeEvery(ActionTypes.GET_WEATHER_FOR_CITY, getWeatherForCity);
  yield takeEvery(ActionTypes.GET_WEATHER_FOR_CITIES, getWeatherForCities);
  yield takeLatest(ActionTypes.DELETE_CITY, deleteCity);
}
