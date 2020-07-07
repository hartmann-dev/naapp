import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { enableScreens } from "react-native-screens";
import ReduxThunk from "redux-thunk";
import { Notifications } from "expo";

import { Vibration, Platform } from "react-native";

import navigationReducer from "./store/reducers/navigation";
import newsReducer from "./store/reducers/news";
import galleryReducer from "./store/reducers/gallery";
import artistReducer from "./store/reducers/artist";

import AppNavigator from "./navigation/AppNavigator";
import registerForPushNotifications from "./registerForPushNotifications";

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

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    registerForPushNotifications().then((token) => setExpoPushToken(token));
    Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });
    Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    return () => {
      Notifications.removeAllNotificationListeners();
    };
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
