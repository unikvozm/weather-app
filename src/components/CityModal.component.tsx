import * as React from 'react';
import {Modal, Portal, Text, Provider, IconButton} from 'react-native-paper';
import {TextInput} from 'react-native-paper';

type Props = {
  close: () => void;
};

export const CityModal = ({close}: Props) => {
  const [query, setQuery] = React.useState<string>('');

  return (
    <Provider>
      <Portal>
        <Modal visible dismissable={false}>
          <Text>
            Adding a new city
            <IconButton icon="close" onPress={close} />
          </Text>
          <TextInput
            label="City"
            value={query}
            onChangeText={(text) => setQuery(text)}
            placeholder="Start typing a city"
          />
        </Modal>
      </Portal>
    </Provider>
  );
};
