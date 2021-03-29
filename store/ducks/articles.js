import Article from "../../models/article";
import axios from "../../services/axios";

const SET_ARTICLES = "SET_ARTICLES";

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
        .get("articles")
        .then((response) => {
          const resData = response.data;

          for (const key in resData) {
            loadedArticles.push(
              new Article({
                id: resData[key].id,
                title: resData[key].title,
                image: resData[key].image?.url,
                date: resData[key].date,
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
