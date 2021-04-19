import Gallery from "../../models/gallery";
import Image from "../../models/image";
import axios from "../../services/axios";

const SET_GALLERIES = "SET_GALLERIES";

const galleriesCache = {};

const initialState = {
  galleries: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GALLERIES:
      return {
        ...state,
        galleries: action.payload,
      };
  }

  return state;
};

export const getGalleries = () => {
  return async (dispatch) => {
    let loadedGalleries = [];
    if (galleriesCache.length > 0) {
      dispatch({ type: SET_GALLERIES, payload: galleriesCache });
    } else {
      axios
        .get("galleries")
        .then((response) => {
          const resData = response.data;
          for (const key in resData) {
            let img = null;
            if (resData[key].image) {
              const resImage = resData[key].image;
              img = new Image({
                id: resImage.id,
                url: resImage.url,
                width: resImage.width,
                height: resImage.height,
              });
            }

            loadedGalleries.push(
              new Gallery({
                id: resData[key].id,
                title: resData[key].title,
                image: img,
                content: resData[key].content.map(
                  (item) =>
                    new Image({
                      id: item.id,
                      url: item.url,
                      width: item.width,
                      height: item.height,
                    })
                ),
                slug: resData[key].slug,
              })
            );
          }
          //galleriesCache = loadedArticles;
          dispatch({ type: SET_GALLERIES, payload: loadedGalleries });
        })
        .catch((error) => {
          console.log(error);
          //throw new Error("Ein Fehler ist aufgetreten!");
        });
    }
  };
};
