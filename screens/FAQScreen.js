import React from "react";
import { StyleSheet, Text, View } from "react-native";

const FAQScreen = (props) => {
  return (
    <View style={styles.faq}>
      <Text>FAQ</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  faq: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default FAQScreen;
