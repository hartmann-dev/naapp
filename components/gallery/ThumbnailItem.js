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
    borderColor: Colors.primary,
    borderWidth: 1,
    height: 80,
    width: 120,
  },
  thumbnail: {
    height: 80,
    width: 120,
  },
  tnCard: {
    flex: 1,
  },
});

export default ThumbnailItem;
