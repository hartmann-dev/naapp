import React from "react";
import { StyleSheet, View, Image, Pressable } from "react-native";

import Colors from "../../constants/Colors";
import Calc from "../../utils/calc";

const ThumbnailItem = (props) => {
  return (
    <View style={styles.tnItem}>
      <Pressable style={{ flex: 1 }} onPress={props.onViewDetail}>
        <View style={styles.tnCard}>
          <Image style={styles.thumbnail} source={{ uri: props.uri }} />
        </View>
      </Pressable>
    </View>
  );
};

const size = Calc.cardSize("gallery");

const styles = StyleSheet.create({
  tnItem: {
    margin: size.margin,
    height: size.height,
    width: size.width,
  },
  thumbnail: {
    height: size.height,
    width: size.width,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  tnCard: {
    flex: 1,
  },
});

export default ThumbnailItem;
