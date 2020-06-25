import GalleryItem from "../../models/galleryitem";

export const SET_THUMBNAILS = "SET_THUMBNAILS";
export const SET_IMAGES = "SET_IMAGES";

const galleryCache = {};

export const fetchThumbnails = (galleryId) => {
  return async (dispatch) => {
    try {
      let loadedThumbnails = [];
      if (galleryCache.hasOwnProperty(galleryId)) {
        loadedThumbnails = galleryCache[galleryId];
      } else {
        const response = await fetch("https://www.noarts.de/wp-json/app_news_api/v1/gallery/" + galleryId);
        if (!response.ok) {
          throw new Error("Something went wrong!!");
        }

        const resData = await response.json();

        for (const key in resData) {
          loadedThumbnails.push(
            new GalleryItem(resData[key].id, resData[key].uri, resData[key].width, resData[key].height)
          );
        }
        galleryCache[galleryId] = loadedThumbnails;
      }

      dispatch({ type: SET_THUMBNAILS, thumbnails: loadedThumbnails });
    } catch (err) {
      //
      throw err;
    }
  };
};

export const fetchImages = (galleryId) => {
  return async (dispatch) => {
    try {
      const response = await fetch("https://www.noarts.de/wp-json/app_news_api/v1/gallery2/" + galleryId);

      if (!response.ok) {
        throw new Error("Something went wrong!!");
      }

      const resData = await response.json();
      const loadedThumbnails = [];
      for (const key in resData) {
        loadedThumbnails.push(
          new GalleryItem(resData[key].id, resData[key].uri, resData[key].width, resData[key].height)
        );
      }

      dispatch({ type: SET_IMAGES, images: loadedThumbnails });
    } catch (err) {
      //
      throw err;
    }
  };
};
