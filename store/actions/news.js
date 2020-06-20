import News from "../../models/news";

export const SET_NEWS = "SET_NEWS";
export const SET_NEWS_DETAILS = "SET_NEWS_DETAILS";

export const fetchNews = () => {
  return async (dispatch) => {
    try {
      const response = await fetch("https://www.noarts.de/wp-json/app_news_api/v1/news");

      if (!response.ok) {
        throw new Error("Something went wrong!!");
      }

      const resData = await response.json();
      const loadedNews = [];

      for (const key in resData) {
        loadedNews.push(new News(resData[key].id, resData[key].title, resData[key].image));
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
      const response = await fetch("https://www.noarts.de/wp-json/app_news_api/v1/news/" + postId);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await response.json();
      let loadedNews = new News(
        resData.id,
        resData.title,
        resData.image,
        resData.image_width,
        resData.image_height,
        resData.content,
        resData.date,
        resData.aaa
      );
      // console.log(loadedNews);
      dispatch({ type: SET_NEWS_DETAILS, details: loadedNews });
    } catch (err) {
      throw err;
    }
  };
};
