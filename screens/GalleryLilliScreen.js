import React from "react";
import GalleryOverview from "../components/gallery/GalleryOverview";
import { useIsFocused } from "@react-navigation/native";

const GalleryLilliScreen = (props) => {
  return useIsFocused() ? <GalleryOverview galleryId={5} /> : null;
};
export default GalleryLilliScreen;
