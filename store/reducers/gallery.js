import GalleryItem from "../../models/galleryitem";
import { SET_THUMBNAILS, SET_IMAGES } from "../actions/gallery";

const initialState = {
  thumbnails: [],
  images: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_THUMBNAILS:
      return {
        ...state,
        thumbnails: action.thumbnails,
      };
    case SET_IMAGES:
      return {
        ...state,
        images: action.images,
      };
  }

  return state;
};
