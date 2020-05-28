import React from "react";
import { StyleSheet, Text, View } from "react-native";

const GuestsScreen = () => {
  return (
    <View style={styles.guests}>
      <Text>Gäste</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  guests: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default GuestsScreen;
