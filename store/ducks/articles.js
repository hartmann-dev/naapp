import Article from '../../models/article';
import Image from '../../models/image';
import axios from '../../services/axios';

const SET_ARTICLES = 'SET_ARTICLES';

const articlesCache = {};

const initialState = {
  articles: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ARTICLES:
      return {
        ...state,
        articles: action.payload,
      };
  }

  return state;
};

export const getArticles = () => {
  return async (dispatch) => {
    let loadedArticles = [];
    if (articlesCache.length > 0) {
      dispatch({ type: SET_ARTICLES, payload: articlesCache });
    } else {
      axios
        .get('api/articles/')
        .then((response) => {
          const resData = response.data.data;
          for (const key in resData) {
            let img = null;
            if (resData[key].attributes.image.data) {
              const resImage = resData[key].attributes.image.data;

              img = new Image({
                id: resImage.id,
                url: resImage.attributes.url,
                width: resImage.attributes.width,
                height: resImage.attributes.height,
              });
            }

            loadedArticles.push(
              new Article({
                id: resData[key].id,
                title: resData[key].attributes.title,
                image: img,
                date: resData[key].attributes.showDate ? convertDate(resData[key].attributes.createdAt) : null,
                content: resData[key].attributes.content,
                social: resData[key].attributes.social,
                type: resData[key].attributes.type,
                slug: resData[key].attributes.slug,
              })
            );
          }
          //articlesCache = loadedArticles;
          dispatch({ type: SET_ARTICLES, payload: loadedArticles });
        })
        .catch((error) => {
          console.log(error);
          //throw new Error("Ein Fehler ist aufgetreten!");
        });
    }
  };
};
const convertDate = (date) => {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    // hour: "2-digit",
    // minute: "2-digit",
  };
  return new Date(date).toLocaleDateString('de', options);
};
