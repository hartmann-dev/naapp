import React from "react";
import { StyleSheet, Text, View } from "react-native";

const TeamScreen = () => {
  return (
    <View style={styles.team}>
      <Text>Team</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  team: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TeamScreen;
