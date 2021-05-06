import React, { useState, useEffect, useRef } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { Provider } from "react-redux";
import { enableScreens } from "react-native-screens";
import * as Notifications from "expo-notifications";

import store from "./store/store";

import AppNavigator from "./navigation/AppNavigator";
import registerForPushNotifications from "./registerForPushNotifications";

enableScreens();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

const fetchFonts = () => {
  return Font.loadAsync({
    alien: require("./assets/fonts/alien.ttf"),
    alienbold: require("./assets/fonts/alienbold.ttf"),
    Courier: require("./assets/fonts/Courier.ttf"),
    // Arial ist nicht frei verfügbar, überschreiben damit react-native-markup-view keinen Fehler wirft
    Arial: require("./assets/fonts/LiberationSans-Regular.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotifications().then((token) => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        // response verarbeiten für deep link
        console.log(response);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(error) => console.warn("splash errir", error)}
      />
    );
  }
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
