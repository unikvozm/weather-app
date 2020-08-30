import {ViewStyle, StyleProp, GestureResponderEvent} from 'react-native';

export type CustomButtonProps = {
  style?: StyleProp<ViewStyle>;
  text: string;
  onPress: (event: GestureResponderEvent) => void;
};
