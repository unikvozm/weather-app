import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {List} from 'react-native-paper';
import {RootStackParamList} from '../types/RootStackParamList';
import {WeatherItem} from '../components/WeatherItem.component';
import {UIconstants} from '../constants/styles.constants';
import {weatherSelector} from '../redux/selectors/weather.selector';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

type Props = {
  route: DetailsScreenRouteProp;
};

export const DetailsScreen = ({route}: Props) => {
  const {cityId} = route.params;
  const cityData = useSelector(weatherSelector.getCityWeather(cityId));
  const units = useSelector(weatherSelector.getWeatherUnits);

  if (cityData) {
    const windSpeed = `${cityData.windSpeed} ${
      units === 'metric' ? 'm/s' : 'miles/hour'
    }`;
    return (
      <View style={styles.container} accessibilityHint="Weather Details">
        <WeatherItem city={cityData} units={units} />
        <List.Item
          style={styles.listItem}
          title="Humidity"
          right={(props) => <Text {...props}>{cityData.humidity} %</Text>}
          accessibilityHint="Humidity"
        />
        <List.Item
          style={styles.listItem}
          title="Pressure"
          right={(props) => <Text {...props}>{cityData.pressure} hPa</Text>}
          accessibilityHint="Pressure"
        />
        <List.Item
          style={styles.listItem}
          title="Wind speed"
          right={(props) => <Text {...props}>{windSpeed}</Text>}
          accessibilityHint="Wind speed"
        />
        <List.Item
          style={styles.listItem}
          title="Cloud cover"
          right={(props) => <Text {...props}>{cityData.cloudsCover} %</Text>}
          accessibilityHint="Cloud cover"
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text>Something went wrong</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 2,
    padding: 12,
    borderBottomColor: UIconstants.colors.Grey,
    borderBottomWidth: 2,
  },
});
