import React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import GalleryRalfScreen, { screenOptions as RalfsScreenOptions } from "../screens/GalleryRalfScreen";
import GalleryKatrinScreen from "../screens/GalleryKatrinScreen";
import GalleryPatrickScreen from "../screens/GalleryPatrickScreen";
import GalleryLilliScreen from "../screens/GalleryLilliScreen";

import Colors from "../constants/Colors";

const TabNav = createMaterialTopTabNavigator();

const GalleryTabNavigator = () => {
  return (
    <TabNav.Navigator
      tabBarPosition={"bottom"}
      lazy={"lazy"}
      sceneContainerStyle={{
        backgroundColor: Colors.background,
      }}
      tabBarOptions={{
        activeBackgroundColor: Colors.primary,
        activeTintColor: Colors.accent,
        inactiveBackgroundColor: Colors.background,
        inactiveTintColor: "black",

        tabStyle: {
          justifyContent: "center",
          borderColor: Colors.background,
          borderTopWidth: 2,
          backgroundColor: Colors.primary,
        },
        labelStyle: {
          fontSize: 22,
          fontFamily: "alienbold",

          //fontWeight: "bold",
        },
        showIcon: false,
      }}
    >
      <TabNav.Screen name="Ralf" component={GalleryRalfScreen} options={RalfsScreenOptions} />
      <TabNav.Screen name="Katrin" component={GalleryKatrinScreen} />
      <TabNav.Screen name="Patrick" component={GalleryPatrickScreen} />
      <TabNav.Screen name="Lilli" component={GalleryLilliScreen} />
    </TabNav.Navigator>
  );
};

export default GalleryTabNavigator;
