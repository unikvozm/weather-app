import {all} from 'redux-saga/effects';
import {weatherWatcher} from './weather.saga';

export function* rootSaga() {
  yield all([weatherWatcher()]);
}
