import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {UIconstants} from '../constants/styles.constants';

export type RadioBtnData = {
  value: string;
  text: string;
};
type Props = {
  data: RadioBtnData[];
  onValueChange: (value: string) => void;
  initialValue: string;
};
export const RadioButtonComponent = ({
  data,
  onValueChange,
  initialValue,
}: Props) => {
  return (
    <View>
      {data.map((res) => {
        return (
          <View key={res.value} style={styles.container}>
            <Text style={styles.radioText}>{res.text}</Text>
            <TouchableOpacity
              style={styles.radioCircle}
              onPress={() => onValueChange(res.value)}>
              {res.value === initialValue && <View style={styles.selectedRb} />}
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioText: {
    marginRight: 15,
    fontSize: 14,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: UIconstants.colors.VividCyan,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: UIconstants.colors.VividCyan,
  },
});
