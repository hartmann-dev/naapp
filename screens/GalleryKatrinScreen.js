import React from "react";
import GalleryOverview from "../components/gallery/GalleryOverview";
import { useIsFocused } from "@react-navigation/native";

const GalleryKatrinScreen = (props) => {
  return useIsFocused() ? <GalleryOverview galleryId={2} /> : null;
};
export default GalleryKatrinScreen;
