import React from "react";
import GalleryOverview from "../components/gallery/GalleryOverview";
import { useIsFocused } from "@react-navigation/native";

const GalleryKatrinScreen = (props) => {
  return (useIsFocused() ?
    <GalleryOverview
      navigation={props.navigation}
      galleryId={2} /> :
    null);
};
export default GalleryKatrinScreen;
