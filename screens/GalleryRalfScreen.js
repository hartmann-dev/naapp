import React from "react";
import GalleryOverview from "../components/gallery/GalleryOverview";
import { useIsFocused } from "@react-navigation/native";

const GalleryRalfScreen = (props) => {
  return useIsFocused() ? <GalleryOverview galleryId={1} /> : null;
};
export default GalleryRalfScreen;
