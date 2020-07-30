import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Button } from "react-native";
import GalleryTabNavigator from "../navigation/GalleryTabNavigator";

import * as artistActions from "../store/actions/artist";

import Colors from "../constants/Colors";

const GalleryScreen = (props) => {
  return <GalleryTabNavigator />
};

const styles = StyleSheet.create({
  gallery: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centered: { flex: 1, justifyContent: "center", alignItems: "center",  backgroundColor: Colors.background},
});

export default GalleryScreen;
