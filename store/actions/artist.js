import Artist from "../../models/artist";

export const SET_MEMBER = "SET_MEMBER";
export const SET_MEMBER_DETAILS = "SET_MEMBER_DETAILS";
export const SET_GUESTS = "SET_GUESTS";

const memberCache = {};

export const fetchMember = () => {
  return async (dispatch) => {
    let loadedMember = [];

    try {
      if(memberCache.hasOwnProperty("team")) {
        loadedMember = memberCache["team"];

      } else {

        const response = await fetch("https://www.noarts.de/wp-json/app_news_api/v1/team");

        if (!response.ok) {
          throw new Error("Ein Fehler ist aufgetreten!");
        }

        const resData = await response.json();
        for (const key in resData) {
          loadedMember.push(new Artist(resData[key].id, resData[key].title, resData[key].image));
        }
        memberCache["team"] = loadedMember;
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
      let loadedMember;
      if(memberCache.hasOwnProperty(postId)){
        loadedMember = memberCache[postId];
      } else {

        const response = await fetch("https://www.noarts.de/wp-json/app_news_api/v1/team/" + postId);
        if (!response.ok) {
          throw new Error("Ein Fehler ist aufgetreten!");
        }
        const resData = await response.json();
        loadedMember = new Artist(
          resData.id,
          resData.title,
          resData.image,
          resData.image_width,
          resData.image_height,
          resData.aaa,
          resData.links
          );
          memberCache[postId] = loadedMember;
      }
      dispatch({ type: SET_MEMBER_DETAILS, details: loadedMember });
    } catch (err) {
      throw err;
    }
  };
};

export const fetchGuests = () => {
  return async (dispatch) => {
    try {
      let loadedGuests = [];
      if(memberCache.hasOwnProperty("guests")) {
        loadedGuests = memberCache["guests"];

      } else {

        const response = await fetch("https://www.noarts.de/wp-json/app_news_api/v1/guests");
        
        if (!response.ok) {
          throw new Error("Ein Fehler ist aufgetreten!");
        }
        
        const resData = await response.json();
        for (const key in resData) {
          loadedGuests.push(new Artist(resData[key].id, resData[key].title, resData[key].image));
        }
        memberCache["guests"] = loadedGuests;

      }
        
      dispatch({ type: SET_GUESTS, guests: loadedGuests });
    } catch (err) {
      //
      throw err;
    }
  };
};
