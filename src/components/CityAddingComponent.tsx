import * as React from 'react';
import {TextInput} from 'react-native-paper';
import {View, Button, StyleSheet} from 'react-native';

type Props = {
  addCity: (city: string) => void;
  closeAddingMode: () => void;
};

export const CityAddingComponent = ({addCity, closeAddingMode}: Props) => {
  const [query, setQuery] = React.useState<string>('');
  const onSubmit = () => {
    addCity(query);
    closeAddingMode();
  };
  return (
    <View>
      <TextInput
        label="City"
        value={query}
        onChangeText={(text) => setQuery(text)}
        placeholder="Start typing a city"
      />
      <View style={styles.btnsContainer}>
        <Button onPress={onSubmit} title="Add" disabled={!query} />
        <Button onPress={closeAddingMode} title="Cancel" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 10,
    flexShrink: 3,
  },
});
