import React from "react";
import { View, StyleSheet } from "react-native";
import GalleryOverview from "../components/gallery/GalleryOverview";
import { useIsFocused } from "@react-navigation/native";

import Colors from "../constants/Colors";

const GalleryPatrickScreen = (props) => {
  return useIsFocused() ? <GalleryOverview galleryId={3} /> : null;
};

export default GalleryPatrickScreen;
