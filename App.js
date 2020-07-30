import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { enableScreens } from "react-native-screens";
import ReduxThunk from "redux-thunk";
import * as Notifications from "expo-notifications";

import navigationReducer from "./store/reducers/navigation";
import newsReducer from "./store/reducers/news";
import galleryReducer from "./store/reducers/gallery";
import artistReducer from "./store/reducers/artist";

import AppNavigator from "./navigation/AppNavigator";
import registerForPushNotifications from "./registerForPushNotifications";

enableScreens();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

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

  /* Erstmal auf Eis gelegt
  useEffect(() => {
    console.log("start");

    registerForPushNotifications().then((token) => setExpoPushToken(token));
    Notifications.addNotificationReceivedListener((notification) => {
      console.log("start 1");

      setNotification(notification);
    });
    console.log("start 3");

    Notifications.addNotificationResponseReceivedListener((response) => {
      console.log("start 2");

      console.log(response);
    });
    console.log("starrt 4");

    return () => {
      console.log("end");

      Notifications.removeAllNotificationListeners();
    };
  }, []);
  /*
  if (!fontLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />;
  }
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
