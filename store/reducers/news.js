import { SET_NEWS, SET_NEWS_DETAILS } from "../actions/news";

const initialState = {
  availableNews: [], //ggf cachen
  newsDetails: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_NEWS:
      return {
        ...state,
        availableNews: action.news,
      };
    case SET_NEWS_DETAILS:
      return {
        ...state,
        newsDetails: action.details,
      };
  }

  return state;
};
