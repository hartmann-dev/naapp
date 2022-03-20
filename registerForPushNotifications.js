import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import axios from "./services/axios";

const registerForPushNotifications = async () => {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
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

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
    axios
      .get(`push-tokens/token/${token}`)
      //.then((data) => console.log(data))
      .catch((e) => {
        console.log(e);
        if (e.response.status === 404) {
          axios
            .post("push-tokens", {
              token: token,
              device:
                "Device Name: " +
                Device.deviceName +
                " | Brand: " +
                Device.brand +
                " | Model Name: " +
                Device.modelName +
                " | Model Id: " +
                Device.modelId +
                " | Model Id: " +
                Device.osVersion +
                " | Year Class: " +
                Device.deviceYearClass,
            })
            .then(function (response) {
              //console.log(response);
            })
            .catch(function (error) {
              //console.error(error);
            });
        }
      });

    return token;
  } else {
    return token;
    //alert("Must use physical device for Push Notifications");
  }
};

export default registerForPushNotifications;
