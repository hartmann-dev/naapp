import News from "../../models/news";

export const SET_NEWS = "SET_NEWS";
export const SET_NEWS_DETAILS = "SET_NEWS_DETAILS";

const newsCache = {};

export const fetchNews = () => {
  return async (dispatch) => {
    try {
      let loadedNews = [];
      if(newsCache.hasOwnProperty("news")) {
        loadedNews = newsCache["news"];
      } else {

        const response = await fetch("https://www.noarts.de/wp-json/app_news_api/v1/news");
        
        if (!response.ok) {
          throw new Error("Ein Fehler ist aufgetreten!");
        }
        
        const resData = await response.json();
        
        for (const key in resData) {
          loadedNews.push(new News(resData[key].id, resData[key].title, resData[key].image));
        }
        newsCache["news"] = loadedNews;
      }

      dispatch({ type: SET_NEWS, news: loadedNews });
    } catch (err) {
      //
      throw err;
    }
  };
};

export const fetchNewsDetails = (postId) => {
  return async (dispatch) => {
    try {
      let loadedNews;
      if(newsCache.hasOwnProperty(postId)) {
        loadedNews = newsCache[postId];
      } else {
        
        const response = await fetch("https://www.noarts.de/wp-json/app_news_api/v1/news/" + postId);
        
        if (!response.ok) {
          throw new Error("Ein Fehler ist aufgetreten!");
        }
        const resData = await response.json();
        loadedNews = new News(
          resData.id,
          resData.title,
          resData.image,
          resData.image_width,
          resData.image_height,
          resData.content,
          resData.date,
          resData.aaa,
          resData.video
          );
          newsCache[postId] = loadedNews;
      }
      dispatch({ type: SET_NEWS_DETAILS, details: loadedNews });
    } catch (err) {
      throw err;
    }
  };
};
