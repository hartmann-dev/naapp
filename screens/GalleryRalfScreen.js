import React from "react";
import GalleryOverview from "../components/gallery/GalleryOverview";
import { useIsFocused } from "@react-navigation/native";

const GalleryRalfScreen = (props) => {
  return useIsFocused() ? <GalleryOverview name={"Ralf"} navigation={props.navigation} galleryId={1} /> : null;
};

export const screenOptions = {
  headerTitle: "Ralaaaa",
};

export default GalleryRalfScreen;
