import * as React from 'react';
import {TouchableOpacity, Image, StyleSheet, View, Text} from 'react-native';
import {List, Chip} from 'react-native-paper';
// @ts-ignore
import Swipeable from 'react-native-swipeable';
import {WeatherData} from '../types/WeatherData';
import {UIconstants} from '../constants/styles.constants';

type Props = {
  city: WeatherData;
  onPress?: () => void;
  onDelete?: () => void;
  swipable?: boolean;
};
export const WeatherItem = ({
  city,
  onPress,
  onDelete,
  swipable = false,
}: Props) => {
  const iconUrl = `https://openweathermap.org/img/wn/${city.icon}@4x.png`;
  const temperature = `${city.temp}°C`;

  const swipeBtns = [
    <View key="delete">
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>,
  ];

  const item = (
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

  return swipable ? (
    <Swipeable rightButtons={swipeBtns}>{item}</Swipeable>
  ) : (
    item
  );
};

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
  },
  listItem: {
    justifyContent: 'space-between',
    margin: 2,
    padding: 12,
    borderBottomColor: UIconstants.colors.Grey,
    borderBottomWidth: 2,
  },
  chip: {
    alignItems: 'center',
    fontSize: 20,
    padding: 10,
  },
  chipBackground: {
    backgroundColor: UIconstants.colors.VividCyan,
  },
  deleteButton: {
    backgroundColor: UIconstants.colors.Red,
    height: 75,
    width: 75,
  },
  deleteText: {
    color: UIconstants.colors.PureLight,
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 25,
  },
});
