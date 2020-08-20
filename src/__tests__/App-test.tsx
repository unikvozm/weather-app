import React from 'react';
import { render, within } from '@testing-library/react-native';
import Main from '../../index';
import { getWeatherByCityIds as mockGetWeatherByCityIds } from '../redux/api/weather.api';
import {data} from '../utils/MockedWeatherData';

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

  // General queries for `firstItem` to contain the expected information
  const firstItem = within(items[0]);
  console.log(firstItem.findAllByText('19.27'))
  expect(firstItem.getByText('London')).toBeTruthy();
  expect(firstItem.getByText('Clouds')).toBeTruthy();
  // expect(firstItem.getByText('19.27°C')).toBeTruthy();

  // Or more specific queries for `firstItem` to contains the expected information in proper fields
  // expect(firstItem.getByA11yHint('Location')).toHaveTextContent('Wrocław');
  // expect(firstItem.getByA11yHint('Weather Description')).toHaveTextContent(
  //   'Sunny'
  // );
  // expect(firstItem.getByA11yHint('Temperature')).toHaveTextContent('25 °C');

  // ... checks for second and third item
});

// test('Navigates to details screen when location is tapped', async () => {
//   mockGetWeatherData.mockImplementationOnce(() =>
//     Promise.resolve([wroclaw, newYork, london])
//   );

//   const app = render(<App />);

//   const listScreen = within(app.getByA11yHint('Weather List'));
//   fireEvent.press(await listScreen.findByText('Wrocław'));

//   const detailsScreen = within(await app.findByA11yHint('Weather Details'));
//   expect(detailsScreen.getByText('Wrocław')).toBeTruthy();

//   // ... checks for other weather data
// });