import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GalleryRalfScreen from "../screens/GalleryRalfScreen";
import GalleryKatrinScreen from "../screens/GalleryKatrinScreen";
import GalleryPatrickScreen from "../screens/GalleryPatrickScreen";
const TabNav = createBottomTabNavigator();

const GalleryTabNavigator = () => {
    return (
        <TabNav.Navigator>
            <TabNav.Screen name="Ralf" component={GalleryRalfScreen} />
            <TabNav.Screen name="Katrin" component={GalleryKatrinScreen} />
            <TabNav.Screen name="Patrick" component={GalleryPatrickScreen} />
        </TabNav.Navigator>

    );
};

export default GalleryTabNavigator;