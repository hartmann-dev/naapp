import React from "react";
import { StyleSheet, Text, ScrollView } from "react-native";

import Colors from "../constants/Colors";

const ContactScreen = (props) => {
  return (
    <ScrollView style={styles.contact}>
      <Text style={styles.header}>Kontakt</Text>
      <Text style={styles.bold}>Anschrift</Text>
      <Text>
        NoArts!{"\n"}
        Tattoo Bürgermeister-Regitz-Str. 27 {"\n"}
        66539 Neunkirchen – Germany {"\n"}
        Tel.: +49 (0) 68 21 / 309 32 20 {"\n"}
        E-Mail: noarts.tattoo@gmail.com {"\n"}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contact: {
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

export default ContactScreen;
