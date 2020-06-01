import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import NewsScreen from "../screens/NewsScreen";
import NewsDetailsScreen, { screenOptions as NewsDetailsScreenOptions } from "../screens/NewsDetailsScreen";
import TeamScreen from "../screens/TeamScreen";
import GuestsScreem from "../screens/GuestsScreen";
import AppointmentScreen from "../screens/AppointmentScreen";
import FAQScreen from "../screens/FAQScreen";
import ShopScreen from "../screens/FAQScreen";

import Colors from "../constants/Colors";

const StackNav = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <StackNav.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.accent,
          headerTitleStyle: {
            fontFamily: "alien",
            fontSize: 24,
          },
        }}
      >
        <StackNav.Screen name="Home" component={HomeScreen} options={{ title: "NoArts! App" }} />
        <StackNav.Screen name="News" component={NewsScreen} />
        <StackNav.Screen name="NewsDetails" component={NewsDetailsScreen} options={NewsDetailsScreenOptions} />
        <StackNav.Screen name="Team" component={TeamScreen} />
        <StackNav.Screen name="Guests" component={GuestsScreem} options={{ title: "Gäste" }} />
        <StackNav.Screen name="Appointments" component={AppointmentScreen} options={{ title: "Termine" }} />
        <StackNav.Screen name="FAQ" component={FAQScreen} />
        <StackNav.Screen name="Shop" component={ShopScreen} />
      </StackNav.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
