import axios from '../../services/axios';

const SET_CONFIG = 'SET_CONFIG';

const configCache = {};

const initialState = {
  navigation: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CONFIG:
      return {
        ...state,
        navigation: action.payload,
      };
  }

  return state;
};

export const getConfig = () => {
  return async (dispatch) => {
    if (configCache.length > 0) {
      dispatch({ type: SET_CONFIG, payload: configCache });
    } else {
      axios
        .get('app-config')
        .then((response) => {
          const resData = response.data.navigation;
          //articlesCache = loadedArticles;
          dispatch({ type: SET_CONFIG, payload: resData });
        })
        .catch((error) => {
          console.log('default', error);

          //throw new Error("Ein Fehler ist aufgetreten!");
        });
    }
  };
};
