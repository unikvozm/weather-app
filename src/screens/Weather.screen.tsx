import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {RouteProp} from '@react-navigation/native';
import {List} from 'react-native-paper';
import {RootStackParamList} from '../types/RootStackParamList';
import {weatherActions} from '../redux/actions/weather.actions';
import {Store} from '../redux/reducers/root.reducer';
import {WeatherData} from '../types/WeatherData';
import {WeatherItem} from '../components/WeatherItem.component';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Weather'
>;

type WeatherScreenRouteProp = RouteProp<RootStackParamList, 'Weather'>;

type Props = {
  navigation: ProfileScreenNavigationProp;
  route: WeatherScreenRouteProp;
};

export const WeatherScreen = ({navigation, route}: Props) => {
  const {cities} = route.params;
  // const [citiesId, setSitiesId] = React.useState(cities);
  const weather = useSelector((state: Store) => state.weather.weather);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(weatherActions.getWeatherForCities(cities));
  }, []);

  const renderItem = (city: WeatherData) => (
    <WeatherItem
      city={city}
      onPress={() => navigation.navigate('Details', {city: city.id})}
      key={city.id}
    />
  );

  return (
    <View style={styles.container}>
      <List.Section style={styles.listContainer}>
        {[...weather.values()].map((city) => renderItem(city))}
      </List.Section>
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
});
