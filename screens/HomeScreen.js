import React from "react";
import { StyleSheet, View, Pressable, ImageBackground, Text } from "react-native";
import { useSelector } from "react-redux";

import Cardlist from "../components/card/list";
import Colors from "../constants/Colors";
import Calc from "../utils/calc";
import Config from "../constants/Config";
const size = Calc.cardSize("home");

const HomeScreen = (props) => {
  const URL = Config.api_url;

  const nav = useSelector((state) => state.config.navigation);

  const navHome = nav.main?.filter((e) => e.homeCard);
  const renderGridItem = (itemData) => {
    return (
      <View
        style={{
          ...styles.navitem,
        }}
      >
        <Pressable
          style={{ flex: 1 }}
          onPress={() =>
            props.navigation.navigate(itemData.item.screen, {
              title: itemData.item.title,
              type: itemData.item.type,
              subScreen: itemData.item.subScreen,
              dispatcher: itemData.item.dispatcher,
              slug: itemData.item.slug,
              sort: itemData.item.sort,
            })
          }
          key={itemData.item.id}
        >
          <View style={styles.itemCard}>
            <ImageBackground
              style={styles.itemIcon}
              source={{
                uri: URL + itemData.item.image,
              }}
              imageStyle={{
                height: size.height, // the image height
                top: -10,
              }}
            >
              <Text style={styles.itemText}>{itemData.item.title}</Text>
            </ImageBackground>
          </View>
        </Pressable>
      </View>
    );
  };
  return <Cardlist type="home" data={navHome} renderGridItem={renderGridItem} />;
};

const styles = StyleSheet.create({
  navitem: {
    margin: size.margin,
    height: size.height,
    width: size.width,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  itemIcon: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    overflow: "hidden", // prevent image overflow the container
  },
  itemText: {
    fontFamily: "alien",
    color: Colors.primary,
    fontSize: 16,
    lineHeight: 18,
    padding: 5,
    textShadowColor: "rgba(0, 0, 0, 0.95)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    color: Colors.accent,
    backgroundColor: Colors.primary,
  },
  itemCard: {
    flex: 1,
  },
});

export default HomeScreen;
