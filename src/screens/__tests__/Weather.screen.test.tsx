import React from 'react';
import renderer from 'react-test-renderer';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider as ReduxProvider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import {createStore, applyMiddleware} from 'redux';
import {rootReducer} from '../../redux/reducers/root.reducer';
import {WeatherScreen} from '../Weather.screen';

const saga = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(saga));

test('WeatherScreen renders correctly', () => {
  const tree = renderer
    .create(
      <ReduxProvider store={store}>
        <PaperProvider>
          <WeatherScreen
            navigation={{
              navigate: jest.fn,
              dispatch: jest.fn,
              reset: jest.fn,
              goBack: jest.fn,
              isFocused: () => false,
              canGoBack: () => true,
              dangerouslyGetParent: jest.fn,
              dangerouslyGetState: jest.fn(),
              setOptions: jest.fn,
              setParams: jest.fn,
              removeListener: jest.fn,
              addListener: jest.fn,
              replace: jest.fn,
              push: jest.fn,
              pop: jest.fn,
              popToTop: jest.fn,
            }}
          />
        </PaperProvider>
      </ReduxProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
