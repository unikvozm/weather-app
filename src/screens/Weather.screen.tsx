import * as React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {List, Text} from 'react-native-paper';
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
import {
  RadioBtnData,
  RadioButtonComponent,
} from '../components/RadioButton.component';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export const WeatherScreen = ({navigation}: Props) => {
  const weather = useSelector(weatherSelector.getWeather);
  const error = useSelector(errorSelector.getError);
  const citiesId = useSelector(weatherSelector.getCitiesId());
  const units = useSelector(weatherSelector.getWeatherUnits);

  const [isAddingMode, changeAddingMode] = React.useState(false);

  const dispatch = useDispatch();

  const getCitiesInit = async () => {
    try {
      const cities = await AsyncStorage.getItem('cities');
      const units = await AsyncStorage.getItem('units');
      dispatch(
        weatherActions.getWeatherForCities(
          cities ? JSON.parse(cities) : PREDEFINED_CITIES_ID,
          units ? JSON.parse(units) : 'metric',
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

  const onUnitsChange = (value: string) => {
    const units = value === 'metric' ? 'metric' : 'imperial';
    dispatch(weatherActions.getWeatherForCities(citiesId, units));
  };

  const renderItem = (city: WeatherData) => (
    <WeatherItem
      city={city}
      onPress={() => navigation.navigate('Details', {cityId: city.id})}
      onDelete={() => deleteCity(city.id)}
      key={city.id}
      swipable
      units={units}
    />
  );

  const openAddingMode = () => changeAddingMode(true);
  const closeAddingMode = () => changeAddingMode(false);

  const unitsBtnsData: RadioBtnData[] = [
    {
      value: 'metric',
      text: 'Metric',
    },
    {
      value: 'imperial',
      text: 'Imperial',
    },
  ];
  return (
    <View
      style={styles.container}
      accessibilityHint="Weather Screen"
      testID="Weather Screen">
      <View style={styles.btnContainer}>
        <Button onPress={openAddingMode} title="ADD A CITY" />
        <RadioButtonComponent
          data={unitsBtnsData}
          onValueChange={onUnitsChange}
          initialValue={units}
        />
      </View>
      <Text style={styles.error}>{error}</Text>
      {isAddingMode ? (
        <CityAddingComponent
          addCity={addCity}
          closeAddingMode={closeAddingMode}
        />
      ) : (
        <List.Section
          style={styles.listContainer}
          accessibilityHint="Weather List">
          {weather.map((city) => renderItem(city))}
        </List.Section>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  listContainer: {
    justifyContent: 'space-between',
  },
  error: {
    color: UIconstants.colors.Red,
  },
});
