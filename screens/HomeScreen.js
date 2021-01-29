import React from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";

import Cardlist from "../components/cardlist/cardlist";
import { useSelector } from "react-redux";
import Colors from "../constants/Colors";
import Calc from "../utils/calc";

import * as Linking from "expo-linking";

const HomeScreen = (props) => {
  const nav = useSelector((state) => state.navigation.availableNav);

  const renderGridItem = (itemData) => {
    return (
      <View
        style={{
          ...styles.navitem,
          ...{ backgroundColor: itemData.item.bgColor },
        }}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            if (itemData.item.extern) {
              Linking.openURL(itemData.item.target);
            } else {
              props.navigation.navigate(itemData.item.target);
            }
          }}
        >
          <View style={styles.itemCard}>
            <Image
              style={styles.itemIcon}
              // imageStyle={{ resizeMode: "contain" }}
              source={{
                uri:
                  "https://www.noarts.de/wp-content/uploads/" +
                  itemData.item.icon,
              }}
            />
          </View>
          {/* <Text style={styles.itemText}>{itemData.item.title}</Text> */}
        </TouchableOpacity>
      </View>
    );
  };
  return <Cardlist type="home" data={nav} renderGridItem={renderGridItem} />;
};

const size = Calc.cardSize("home");

const styles = StyleSheet.create({
  navitem: {
    margin: size.margin,
    height: size.height,
    width: size.width,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  itemIcon: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  itemText: {
    fontFamily: "alien",
    //color: Colors.accent,
    color: "black",
    fontSize: 28,
    padding: 10,
    // textShadowColor: "rgba(0, 0, 0, 0.95)",
    // textShadowOffset: { width: -1, height: 1 },
    // textShadowRadius: 10,
  },
  itemCard: {
    flex: 1,
  },
});

export default HomeScreen;
