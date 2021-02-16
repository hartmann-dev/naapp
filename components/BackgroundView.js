import React from "react";

import { StyleSheet, ImageBackground } from "react-native";

const BackgroundView = ({ children }) => {
  const image = require("../assets/bg/Background01.jpg");
  return (
    <ImageBackground source={image} style={styles.image}>
      {children}
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default BackgroundView;
