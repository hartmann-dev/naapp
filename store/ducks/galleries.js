import Gallery from '../../models/gallery';
import Image from '../../models/image';
import axios from '../../services/axios';

const SET_GALLERIES = 'SET_GALLERIES';

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
        .get('api/galleries')
        .then((response) => {
          const resData = response.data.data;
          for (const key in resData) {
            let img = null;
            if (resData[key].attributes.image.data.attributes) {
              const resImage = resData[key].attributes.image.data;
              img = new Image({
                id: resImage.id,
                url: resImage.attributes.url,
                width: resImage.attributes.width,
                height: resImage.attributes.height,
              });
            }

            loadedGalleries.push(
              new Gallery({
                id: resData[key].id,
                title: resData[key].attributes.title,
                image: img,
                content: resData[key].attributes.content.data.map(
                  (item) =>
                    new Image({
                      id: item.id,
                      url: item.attributes.url,
                      width: item.attributes.width,
                      height: item.attributes.height,
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
