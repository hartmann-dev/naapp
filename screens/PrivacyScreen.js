import React from "react";
import { StyleSheet, Text, ScrollView } from "react-native";

import Colors from "../constants/Colors";

const PrivaxyScreen = (props) => {
  return (
    <ScrollView style={styles.privacy}>
      <Text style={styles.header}>Datenschutz</Text>
      <Text>
        Hier Text einfügen für Datenschutz
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  privacy: {
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

export default PrivaxyScreen;
