import React from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import Colors from "../constants/Colors";

const HomeScreen = (props) => {
  const nav = useSelector((state) => state.navigation.availableNav);

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
            <Text style={styles.itemText}>{itemData.item.title}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.home}>
      <FlatList numColumns={2} data={nav} renderItem={renderGridItem} />
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
    margin: 15,
    height: 150,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  itemText: {
    fontFamily: "alien",
    color: Colors.accent,
    fontSize: 28,
    padding: 10,
    textShadowColor: "rgba(0, 0, 0, 0.95)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  itemCard: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
