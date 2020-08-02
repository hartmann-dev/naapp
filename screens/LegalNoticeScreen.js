import React from "react";
import { StyleSheet, Text, ScrollView } from "react-native";

import Colors from "../constants/Colors";

const LegalNoticeScreen = (props) => {
  return (
    <ScrollView style={styles.notice}>
      <Text style={styles.header}>Impressum</Text>
      <Text>
        Hier Text einfügen für Impressum
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  notice: {
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

export default LegalNoticeScreen;
