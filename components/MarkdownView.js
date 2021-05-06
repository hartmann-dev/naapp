import React from "react";
import { StyleSheet, ScrollView, SafeAreaView } from "react-native";

import { MarkdownView as RNMDView } from "react-native-markdown-view";
import { Linking } from "react-native";
import Colors from "../constants/Colors";

const MarkdownView = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <RNMDView
          onLinkPress={(url) => {
            Linking.openURL(url).catch((error) =>
              console.warn("An error occurred: ", error)
            );
          }}
          styles={{
            heading1: {
              fontFamily: "alien",
              fontSize: 28,
              marginTop: 20,
              color: Colors.primary,
              marginBottom: 10,
            },
            link: {
              color: Colors.primary,
            },
            paragraph: {
              lineHeight: 20,
              marginTop: 10,
              marginBottom: 10,
            },
            codeBlock: {
              fontFamily: "Arial",
            },
            inlineCode: {
              fontFamily: "Arial",
            },
          }}
        >
          {children}
        </RNMDView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: 5,
    paddingHorizontal: 15,
    paddingBottom: 100,
  },
  container: {
    flex: 1,
  },
});

export default MarkdownView;
