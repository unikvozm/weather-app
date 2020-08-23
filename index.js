import 'react-native-gesture-handler';
/**
 * @format
 */
import * as React from 'react';
import {AppRegistry} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider as ReduxProvider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import {createStore, applyMiddleware} from 'redux';
import App from './src/App';
import {name as appName} from './app.json';
import {rootReducer} from './src/redux/reducers/root.reducer';
import {rootSaga} from './src/redux/sagas/root.saga';

const saga = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(saga));

export default function Main() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <App />
      </PaperProvider>
    </ReduxProvider>
  );
}

saga.run(rootSaga);
AppRegistry.registerComponent(appName, () => Main);
