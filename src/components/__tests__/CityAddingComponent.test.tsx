import React from 'react';
import renderer from 'react-test-renderer';
import {CityAddingComponent} from '../CityAddingComponent';

test('CityAddingComponent renders correctly', () => {
  const tree = renderer
    .create(<CityAddingComponent addCity={jest.fn} closeAddingMode={jest.fn} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
