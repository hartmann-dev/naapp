import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";

import Colors from "../../constants/Colors";

const ThumbnailItem = (props) => {
  return (
    <View style={styles.tnItem}>
      <TouchableOpacity style={{ flex: 1 }} onPress={props.onViewDetail}>
        <View style={styles.tnCard}>
          <Image style={styles.thumbnail} source={{ uri: props.uri }} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tnItem: {
    marginTop: 15,
    marginBottom: 0,
    height: 80,
    width: 110,
  },
  thumbnail: {
    height: 80,
    width: 110,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  tnCard: {
    flex: 1,
  },
});

export default ThumbnailItem;
