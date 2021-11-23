import React from "react";

import { StyleSheet, ImageBackground, Dimensions } from "react-native";
const winDim = Dimensions.get("window");
const height = winDim.height - 100;

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
    minHeight: height,
  },
});

export default BackgroundView;
