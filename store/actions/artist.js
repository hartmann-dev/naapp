import Artist from "../../models/artist";

export const SET_MEMBER = "SET_MEMBER";
export const SET_MEMBER_DETAILS = "SET_MEMBER_DETAILS";
export const SET_GUESTS = "SET_GUESTS";

export const fetchMember = () => {
  return async (dispatch) => {
    try {
      const response = await fetch("https://www.noarts.de/wp-json/app_news_api/v1/team");

      if (!response.ok) {
        throw new Error("Something went wrong!!");
      }

      const resData = await response.json();
      const loadedMember = [];
      for (const key in resData) {
        loadedMember.push(new Artist(resData[key].id, resData[key].title, resData[key].image));
      }

      dispatch({ type: SET_MEMBER, member: loadedMember });
    } catch (err) {
      //
      throw err;
    }
  };
};

export const fetchMemberDetails = (postId) => {
  return async (dispatch) => {
    try {
      const response = await fetch("https://www.noarts.de/wp-json/app_news_api/v1/team/" + postId);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await response.json();
      const loadedMember = new Artist(
        resData.id,
        resData.title,
        resData.image,
        resData.image_width,
        resData.image_height,
        resData.aaa,
        resData.links
      );

      dispatch({ type: SET_MEMBER_DETAILS, details: loadedMember });
    } catch (err) {
      throw err;
    }
  };
};

export const fetchGuests = () => {
  return async (dispatch) => {
    try {
      const response = await fetch("https://www.noarts.de/wp-json/app_news_api/v1/guests");

      if (!response.ok) {
        throw new Error("Something went wrong!!");
      }

      const resData = await response.json();
      const loadedGuests = [];
      for (const key in resData) {
        loadedGuests.push(new Artist(resData[key].id, resData[key].title, resData[key].image));
      }

      dispatch({ type: SET_GUESTS, guests: loadedGuests });
    } catch (err) {
      //
      throw err;
    }
  };
};
