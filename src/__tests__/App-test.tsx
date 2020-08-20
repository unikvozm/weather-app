import React from 'react';
import { render, within, fireEvent } from '@testing-library/react-native';
import Main from '../../index';
import { getWeatherByCityIds as mockGetWeatherByCityIds } from '../redux/api/weather.api';
import { data } from '../utils/MockedWeatherData';

// Mock API reposponse
jest.mock('../redux/api/weather.api');

test('Fetches and displays list of locations', async () => {
  (mockGetWeatherByCityIds as jest.MockedFunction<typeof mockGetWeatherByCityIds>).mockImplementationOnce(() =>
    Promise.resolve(data)
  );

  const app = render(<Main />);

  expect(mockGetWeatherByCityIds).toHaveBeenCalledTimes(1);

  const listScreen = within(app.getByA11yHint('Weather List'));
  const items = await listScreen.findAllByA11yHint('Weather Forecast');
  expect(items.length).toEqual(3);

  const firstItem = within(items[0]);
  expect(firstItem.getByText('London')).toBeTruthy();
  expect(firstItem.getByText('Clouds')).toBeTruthy();
  expect(firstItem.getByText('19.27°C')).toBeTruthy();

  const secondItem = within(items[1]);
  expect(secondItem.getByText('Wrocław')).toBeTruthy();
  expect(secondItem.getByText('Clouds')).toBeTruthy();
  expect(secondItem.getByText('22.19°C')).toBeTruthy();

  const thirdItem = within(items[2]);
  expect(thirdItem.getByText('Berlin')).toBeTruthy();
  expect(thirdItem.getByText('Clouds')).toBeTruthy();
  expect(thirdItem.getByText('24.42°C')).toBeTruthy();

});

test('Navigates to details screen when location is tapped', async () => {
  (mockGetWeatherByCityIds as jest.MockedFunction<typeof mockGetWeatherByCityIds>).mockImplementationOnce(() =>
    Promise.resolve(data)
  );

  const app = render(<Main />);

  const listScreen = within(app.getByA11yHint('Weather List'));
  fireEvent.press(await listScreen.findByText('Wrocław'));

  const detailsScreen = within(await app.findByA11yHint('Weather Details'));
  expect(detailsScreen.getByText('Wrocław')).toBeTruthy();
  expect(detailsScreen.getByText('Clouds')).toBeTruthy();
  expect(detailsScreen.getByText('22.19°C')).toBeTruthy();
  expect(detailsScreen.getByText('Humidity')).toBeTruthy();
  expect(detailsScreen.getByText('Pressure')).toBeTruthy();
  expect(detailsScreen.getByText('Wind speed')).toBeTruthy();
  expect(detailsScreen.getByText('Cloud cover')).toBeTruthy();

  const humidity = within(await app.findByA11yHint('Humidity'));
  expect(humidity.getByText('73 %')).toBeTruthy();

  const pressure = within(await app.findByA11yHint('Pressure'));
  expect(pressure.getByText('1010 hPa')).toBeTruthy();

  const windSpeed = within(await app.findByA11yHint('Wind speed'));
  expect(windSpeed.getByText('2.6 m/s')).toBeTruthy();

  const cloudCover = within(await app.findByA11yHint('Cloud cover'));
  expect(cloudCover.getByText('40 %')).toBeTruthy();
});