import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from "react-native";
import { useSelector } from "react-redux";
import * as ScreenOrientation from "expo-screen-orientation";
import Colors from "../constants/Colors";

const HomeScreen = (props) => {
  const nav = useSelector((state) => state.navigation.availableNav);
  const [orientation, setOrientation] = useState();

  useEffect(() => {
    ScreenOrientation.getOrientationAsync().then((info) => {
      console.log(info);
      setOrientation(info);
    });

    const subscription = ScreenOrientation.addOrientationChangeListener((evt) => {
      console.log(evt.orientationInfo);
      setOrientation(evt.orientationInfo.orientation);
    });

    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);

  const renderGridItem = (itemData) => {
    return (
      <View style={{ ...styles.navitem, ...{ backgroundColor: itemData.item.bgColor } }}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            props.navigation.navigate(itemData.item.target);
          }}
        >
          <View style={styles.itemCard}>
            <Image
              style={styles.itemIcon}
              // imageStyle={{ resizeMode: "contain" }}
              source={{ uri: "https://www.noarts.de/wp-content/uploads/2020/06/" + itemData.item.icon }}
            />
          </View>
          {/* <Text style={styles.itemText}>{itemData.item.title}</Text> */}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.home}>
      <FlatList
        key={orientation === 1 ? 2 : 3}
        numColumns={orientation === 1 ? 2 : 3}
        data={nav}
        renderItem={renderGridItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  navitem: {
    flex: 1,
    //margin: 15,
    marginBottom: 0,
    minHeight: 180,
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
