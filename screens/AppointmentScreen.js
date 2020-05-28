import React from "react";
import { StyleSheet, Text, View } from "react-native";

const AppointmentScreen = (props) => {
  return (
    <View style={styles.appointment}>
      <Text>Termine</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  appointment: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AppointmentScreen;
