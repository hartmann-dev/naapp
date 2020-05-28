import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ShopScreen = () => {
  return (
    <View style={styles.shop}>
      <Text>Shop</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  shop: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ShopScreen;
