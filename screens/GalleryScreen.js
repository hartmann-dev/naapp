import React from "react";
import { useSelector } from "react-redux";
import Cardlist from "../components/card/list";
import ThumbnailItem from "../components/gallery/ThumbnailItem";

import { getGalleries } from "../store/ducks/galleries";

const GalleryScreen = (props) => {
  const slug = props.route.params.slug;
  const data = useSelector((state) => state.galleries.galleries).find(
    (gallery) => gallery.slug == slug
  );

  const selectItemHandler = (id) => {
    props.navigation.navigate("Image", {
      id,
      slug,
    });
  };

  return (
    <>
      <Cardlist
        type={"gallery"}
        loadData={getGalleries}
        data={data.content}
        renderGridItem={(itemData) => (
          <ThumbnailItem
            item={itemData}
            url={itemData.item.url}
            onViewDetail={(slug) => {
              selectItemHandler(itemData.item.id);
            }}
          />
        )}
      />
    </>
  );
};

export default GalleryScreen;
