import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../types/RootStackParamList';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

type Props = {
  route: ProfileScreenRouteProp;
};

export const DetailsScreen = ({route}: Props) => {
  const {city} = route.params;
  return (
    <View style={styles.container}>
      <Text>Details for {city}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
