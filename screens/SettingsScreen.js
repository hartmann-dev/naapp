import React from "react";
import { StyleSheet, Text, ScrollView, View, Button } from "react-native";
import { usePermissions, NOTIFICATIONS } from "expo-permissions";

import Colors from "../constants/Colors";

const SettingsScreen = (props) => {
  const [permission, askForPermission] = usePermissions(NOTIFICATIONS);
  if (!permission || permission.status !== "granted") {
    return (
      <View>
        <Text>Permission is not granted</Text>
        <Button title="Grant permission" onPress={askForPermission} />
      </View>
    );
  }
  return (
    <ScrollView style={styles.settings}>
      <Text style={styles.header}>Benachrichtigung</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  settings: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 15,
    paddingBottom: 200,
  },
  bold: {
    fontWeight: "bold",
  },
  header: {
    fontSize: 28,
    fontFamily: "alien",
    marginTop: 20,
    marginBottom: 10,
  },
});

export default SettingsScreen;
