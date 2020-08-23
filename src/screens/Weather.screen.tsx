import * as React from 'react';
import {View, StyleSheet, Button, Text} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {List} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import {RootStackParamList} from '../types/RootStackParamList';
import {weatherActions} from '../redux/actions/weather.actions';
import {WeatherData} from '../types/WeatherData';
import {WeatherItem} from '../components/WeatherItem.component';
import {PREDEFINED_CITIES_ID} from '../constants/weather.constants';
import {errorActions} from '../redux/actions/error.actions';
import {weatherSelector} from '../redux/selectors/weather.selector';
import {CityAddingComponent} from '../components/CityAddingComponent';
import {errorSelector} from '../redux/selectors/errors.selector';
import {UIconstants} from '../constants/styles.constants';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export const WeatherScreen = ({navigation}: Props) => {
  const weather = useSelector(weatherSelector.getWeather);
  const error = useSelector(errorSelector.getError);

  const [isAddingMode, changeAddingMode] = React.useState(false);

  const dispatch = useDispatch();

  const getCitiesInit = async () => {
    try {
      const cities = await AsyncStorage.getItem('cities');
      dispatch(
        weatherActions.getWeatherForCities(
          cities ? JSON.parse(cities) : PREDEFINED_CITIES_ID,
        ),
      );
    } catch (error) {
      dispatch(
        errorActions.setErrorMessage('Cannot get cities list from storage'),
      );
    }
  };

  React.useEffect(() => {
    getCitiesInit();
  }, []);

  const addCity = (city: string) =>
    dispatch(weatherActions.getWeatherForCity(city));

  const deleteCity = (cityId: number) =>
    dispatch(weatherActions.deleteCity(cityId));

  const renderItem = (city: WeatherData) => (
    <WeatherItem
      city={city}
      onPress={() => navigation.navigate('Details', {cityId: city.id})}
      onDelete={() => deleteCity(city.id)}
      key={city.id}
      swipable
    />
  );

  const openAddingMode = () => changeAddingMode(true);
  const closeAddingMode = () => changeAddingMode(false);

  return (
    <View style={styles.container}>
      <Button onPress={openAddingMode} title="Add a city" />
      <Text style={styles.error}>{error}</Text>
      {isAddingMode ? (
        <CityAddingComponent
          addCity={addCity}
          closeAddingMode={closeAddingMode}
        />
      ) : (
        <List.Section style={styles.listContainer}>
          {[...weather.values()].map((city) => renderItem(city))}
        </List.Section>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    justifyContent: 'space-between',
  },
  error: {
    color: UIconstants.colors.Red,
  },
});
