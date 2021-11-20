import React from "react";
import { StyleSheet, View, Pressable, Image } from "react-native";
import { useSelector } from "react-redux";

import Cardlist from "../components/card/list";
import Colors from "../constants/Colors";
import Calc from "../utils/calc";
import Config from "../constants/Config";

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
            <Image
              style={styles.itemIcon}
              source={{
                uri: URL + itemData.item.image,
              }}
            />
          </View>
        </Pressable>
      </View>
    );
  };
  return <Cardlist type="home" data={navHome} renderGridItem={renderGridItem} />;
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
