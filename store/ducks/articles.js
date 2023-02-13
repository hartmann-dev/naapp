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
        .get('articles')
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

            loadedArticles.push(
              new Article({
                id: resData[key].id,
                title: resData[key].title,
                image: img,
                date: resData[key].showDate ? convertDate(resData[key].createdAt) : null,
                content: resData[key].content,
                social: resData[key].social,
                type: resData[key].type,
                slug: resData[key].slug,
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
