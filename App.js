import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { enableScreens } from "react-native-screens";
import ReduxThunk from "redux-thunk";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Notifications } from "expo";
import { Vibration, Platform } from "react-native";

import navigationReducer from "./store/reducers/navigation";
import newsReducer from "./store/reducers/news";
import galleryReducer from "./store/reducers/gallery";
import artistReducer from "./store/reducers/artist";

import AppNavigator from "./navigation/AppNavigator";

enableScreens();

const fetchFonts = () => {
  return Font.loadAsync({
    alien: require("./assets/fonts/alien.ttf"),
    alienbold: require("./assets/fonts/alienbold.ttf"),
  });
};

const rootReducer = combineReducers({
  navigation: navigationReducer,
  news: newsReducer,
  gallery: galleryReducer,
  artist: artistReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const registerForPushNotificationsAsync = async () => {
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = await Notifications.getExpoPushTokenAsync();
    console.log(token);
    setExpoPushToken(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.createChannelAndroidAsync("default", {
      name: "default",
      sound: true,
      priority: "max",
      vibrate: [0, 250, 250, 250],
    });
  }
};

const _handleNotification = (notification) => {
  Vibration.vibrate();
  console.log(notification);
  setNotification(notification);
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [expoPushTokenn, setExpoPushToken] = useState();
  const [notification, setNotification] = useState();

  useEffect(() => {
    registerForPushNotificationsAsync();
    Notifications.addListener(_handleNotification);
  });

  if (!fontLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />;
  }
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
