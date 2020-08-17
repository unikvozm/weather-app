import * as React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/RootStackParamList";

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Weather"
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export const WeatherScreen = ({ navigation }: Props) => (
  <View style={styles.container}>
    <Text>Weather</Text>
    <Button
      title="go to Details"
      onPress={() => navigation.navigate("Details", { city: "Perm" })}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
