import * as React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import {List, Chip} from 'react-native-paper';
import {WeatherData} from '../types/WeatherData';
import {UIconstants} from '../constants/styles.constants';

type Props = {
  city: WeatherData;
  onPress: () => void;
};
export const WeatherItem = ({city, onPress}: Props) => {
  const iconUrl = `https://openweathermap.org/img/wn/${city.icon}@4x.png`;
  const temperature = `${city.temp}°C`;
  return (
    <TouchableOpacity onPress={onPress}>
      <List.Item
        style={styles.listItem}
        title={city.name}
        description={city.weather}
        left={(props) => (
          <Image
            {...props}
            style={styles.image}
            source={{uri: iconUrl}}
            accessibilityIgnoresInvertColors
          />
        )}
        right={(props) => (
          <Chip
            {...props}
            textStyle={styles.chip}
            style={styles.chipBackground}>
            {temperature}
          </Chip>
        )}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
  },
  listItem: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 2,
    padding: 12,
    borderColor: UIconstants.colors.Grey,
    borderWidth: 2,
  },
  chip: {
    alignItems: 'center',
    fontSize: 20,
    padding: 10,
  },
  chipBackground: {
    backgroundColor: UIconstants.colors.VividCyan,
  },
});
