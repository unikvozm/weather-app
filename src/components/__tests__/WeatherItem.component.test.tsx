import React from 'react';
import renderer from 'react-test-renderer';
import {WeatherItem} from '../WeatherItem.component';
import {data} from '../../utils/MockedWeatherData';
import {converWeatherData} from '../../utils/convertWeatherData';

const convertedData = converWeatherData(data.list[0]);

test('WeatherItem renders correctly', () => {
  const tree = renderer
    .create(<WeatherItem city={convertedData} units="metric" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
