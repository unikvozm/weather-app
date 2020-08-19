import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {WeatherScreen} from './screens/Weather.screen';
import {DetailsScreen} from './screens/Details.screen';
import {RootStackParamList} from './types/RootStackParamList';
import {UIconstants} from './constants/styles.constants';
import {PREDEFINED_CITIES_ID} from './constants/weather.constants';

declare const global: {HermesInternal: null | {}};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: UIconstants.colors.VividCyan,
          },
          headerTintColor: UIconstants.colors.MilkyWay,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Weather"
          component={WeatherScreen}
          initialParams={{cities: PREDEFINED_CITIES_ID}}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
