import React from "react";
import Cardlist from "../cardlist/cardlist"
import { useSelector } from "react-redux";

import * as galleryActions from "../../store/actions/gallery";

import ThumbnailItem from "../../components/gallery/ThumbnailItem";


const GalleryOverview = (props) => {
  const thumbnails = useSelector((state) => state.gallery.thumbnails);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("GalleryDetails", {
      imageId: id,
      galleryId: props.galleryId,
    });
  };
   
    return (
      <Cardlist
        type="gallery"
        loadData={galleryActions.fetchThumbnails(props.galleryId)}
        data={thumbnails}
        renderGridItem={(itemData) => (
          <ThumbnailItem
            uri={itemData.item.uri}
            onViewDetail={() => {
              selectItemHandler(itemData.item.id);
            }}
          />
        )}
      />
    );
  
};


export default GalleryOverview;
