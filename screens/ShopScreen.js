import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import Colors from "../constants/Colors";

const ShopScreen = (props) => {
  return (
    <View style={styles.shop}>
      <Text style={styles.header}>Hier geht es zum{"\n"} NoArts! Tattoo Shop</Text>
      <Image
        style={styles.shopIcon}
        source={{ uri: "https://www.noarts.de/wp-content/uploads/2020/06/Einkaufswagen.png" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  shop: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 15,
    paddingBottom: 200,
    alignItems: "center",
  },
  bold: {
    fontWeight: "bold",
  },
  header: {
    fontSize: 32,
    fontFamily: "alien",
    marginTop: 20,
    marginBottom: 10,
  },
  shopIcon: {
    height: 200,
    width: 200,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
});

export default ShopScreen;
