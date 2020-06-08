import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import GalleryRalfScreen from "../screens/GalleryRalfScreen";
import GalleryKatrinScreen from "../screens/GalleryKatrinScreen";
import GalleryPatrickScreen from "../screens/GalleryPatrickScreen";

import Colors from "../constants/Colors";

const TabNav = createBottomTabNavigator();

const GalleryTabNavigator = () => {
  return (
    <TabNav.Navigator
      tabBarOptions={{
        activeBackgroundColor: Colors.primary,
        activeTintColor: Colors.accent,
        inactiveBackgroundColor: Colors.background,
        inactiveTintColor: "black",
        tabStyle: {
          justifyContent: "center",
          borderColor: Colors.primary,
          borderLeftWidth: 1,
          borderTopWidth: 3,
        },
        labelStyle: {
          fontSize: 24,
          fontFamily: "alienbold",
          //fontWeight: "bold",
        },
        showIcon: false,
      }}
    >
      <TabNav.Screen name="Ralf" component={GalleryRalfScreen} />
      <TabNav.Screen name="Katrin" component={GalleryKatrinScreen} />
      <TabNav.Screen name="Patrick" component={GalleryPatrickScreen} />
      <TabNav.Screen name="Lilli" component={GalleryPatrickScreen} />
    </TabNav.Navigator>
  );
};

export default GalleryTabNavigator;
