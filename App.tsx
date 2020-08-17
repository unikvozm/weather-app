import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { WeatherScreen } from "./screens/Weather.screen";
import { DetailsScreen } from "./screens/Details.screen";
import { RootStackParamList } from "./types/RootStackParamList";

const Stack = createStackNavigator<RootStackParamList>();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#3EEFD8",
          },
          headerTintColor: "#121330",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen name="Weather" component={WeatherScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
