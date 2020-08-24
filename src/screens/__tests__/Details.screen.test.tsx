import React from 'react';
import renderer from 'react-test-renderer';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider as ReduxProvider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import {createStore, applyMiddleware} from 'redux';
import {DetailsScreen} from '../Details.screen';
import {rootReducer} from '../../redux/reducers/root.reducer';

const saga = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(saga));

test('DetailsScreen renders correctly', () => {
  const tree = renderer
    .create(
      <ReduxProvider store={store}>
        <PaperProvider>
          <DetailsScreen
            route={{params: {cityId: 1}, key: 'string', name: 'Details'}}
          />
        </PaperProvider>
      </ReduxProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
