import React from "react";
import { StyleSheet, Text, Platform } from "react-native";
import Constants from "expo-constants";

import Colors from "../constants/Colors";

const VersionHint = () => {
  const buildNr =
    (Platform.OS === "ios" ? "iOS" : "Android") +
    " " +
    Constants.nativeBuildVersion;

  return (
    <Text style={styles.labelSmall}>
      v{Constants.manifest.version} ({buildNr}){" "}
    </Text>
  );
};

const styles = StyleSheet.create({
  labelSmall: {
    margin: 10,
    marginLeft: 30,
    color: Colors.primary,
    fontSize: 10,
  },
});

export default VersionHint;
