import React, { useState, useEffect, useRef } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { Provider, useDispatch } from "react-redux";
import { enableScreens } from "react-native-screens";
import * as Notifications from "expo-notifications";

import store from "./store/store";

import AppNavigator from "./navigation/AppNavigator";
import registerForPushNotifications from "./registerForPushNotifications";
import { getArticles } from "./store/ducks/articles";
import { getConfig } from "./store/ducks/config";

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

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getArticles());
    dispatch(getConfig());
  }, [dispatch]);
  return <AppNavigator />;
};

export default (props) => {
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

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
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
      <App />
    </Provider>
  );
};
