import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import axios from "./services/axios";

const registerForPushNotifications = async () => {
  let token;
  if (Constants.isDevice) {
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    //alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
    Notifications.setNotificationChannelAsync("tesst2", {
      name: "test222",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });

    axios
      .get(`push-tokens/token/${token}`)
      //.then((data) => console.log(data))
      .catch((e) => {
        if (e.response.status === 404) {
          axios
            .post("push-tokens", { token: token })
            .then(function (response) {
              //console.log(response);
            })
            .catch(function (error) {
              //console.error(error);
            });
        }
      });
  }

  return token;
};

export default registerForPushNotifications;
