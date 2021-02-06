import { artistService } from "../../services/";
// Types
export const LOAD_ARTIST = "LOAD_ARTIST";
export const ERROR_ARTIST = "ERROR_ARTIST";
export const GET_ALL_ARTISTS = "GET_ALL_ARTISTS";

//Initial State
const initialState = {
  artists: [],
  loading: true,
  error: false,
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ARTIST:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case ERROR_ARTIST:
      return {
        ...state,
        artists: [],
        error: true,
        loading: false,
      };
    case GET_ALL_ARTISTS:
      return {
        ...state,
        artists: action.payload,
        error: false,
        loading: false,
      };

    default:
      return state;
  }
};

// Actions
export const getArtists = () => async (dispatch) => {
  dispatch({
    type: LOAD_ARTIST,
  });

  artistService.getArtists().then((artists) => {
    dispatch({
      type: GET_ALL_ARTISTS,
      payload: artists,
    });
  });
};
