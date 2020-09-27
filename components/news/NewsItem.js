import React from "react";
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from "react-native";

import Colors from "../../constants/Colors";
import Calc from "../../utils/calc";

const NewsItem = (props) => {
  return (
    <TouchableOpacity  onPress={props.onViewDetail}>
      <View style={styles.newsitem}>
        <ImageBackground
          source={{ uri: props.image }}
          style={styles.image}
          imageStyle={{ width: "100%", height: "auto", position: "absolute", bottom: 0 }}
        >
          <Text style={styles.title}>{props.title}</Text>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

const size = Calc.cardSize('news');


const styles = StyleSheet.create({
  newsitem: {
    margin: size.margin,
    height: size.height,
    width:size.width,

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

export default NewsItem;
