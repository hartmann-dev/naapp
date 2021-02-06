import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { Provider } from "react-redux";
import { enableScreens } from "react-native-screens";
import ReduxThunk from "redux-thunk";
import * as Notifications from "expo-notifications";

import store from "./store/store";

import AppNavigator from "./navigation/AppNavigator";
import registerForPushNotifications from "./registerForPushNotifications";

enableScreens();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
  }),
});

const fetchFonts = () => {
  return Font.loadAsync({
    alien: require("./assets/fonts/alien.ttf"),
    alienbold: require("./assets/fonts/alienbold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);

  // useEffect(() => {
  //   registerForPushNotifications().then((token) => setExpoPushToken(token));
  //   Notifications.addNotificationReceivedListener((notification) => {
  //     setNotification(notification);
  //   });

  //   Notifications.addNotificationResponseReceivedListener((response) => {
  //     //
  //   });

  //   return () => {
  //     Notifications.removeAllNotificationListeners();
  //   };
  // }, []);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}
      />
    );
  }
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
