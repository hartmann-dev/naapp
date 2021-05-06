import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
} from "react-native";

import Colors from "../../constants/Colors";
import Calc from "../../utils/calc";

const placeholderImg = require("../../assets/bg/card.jpg");

const Carditem = (props) => {
  return (
    <Pressable onPress={props.onViewDetail}>
      <View style={styles.carditem}>
        <ImageBackground
          source={
            props.image !== undefined
              ? { uri: props.image.url }
              : placeholderImg
          }
          style={styles.image}
          imageStyle={{
            resizeMode: "cover",
            justifyContent: "flex-start",
          }}
        >
          <Text style={styles.title}>{props.title}</Text>
        </ImageBackground>
      </View>
    </Pressable>
  );
};

const size = Calc.cardSize("card");

const styles = StyleSheet.create({
  carditem: {
    margin: size.margin,
    height: size.height,
    width: size.width,

    borderColor: Colors.primary,
    borderWidth: 1,
    backgroundColor: Colors.primary,
  },
  image: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
  },
  title: {
    fontFamily: "alien",
    color: Colors.primary,
    fontSize: 24,
    lineHeight: 28,
    padding: 10,
    textShadowColor: "rgba(0, 0, 0, 0.95)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    color: Colors.accent,
    backgroundColor: Colors.primary,
  },
});

export default Carditem;
