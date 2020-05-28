import News from "../../models/news";

export const SET_NEWS = "SET_NEWS";
export const SET_NEWS_DETAILS = "SET_NEWS_DETAILS";

export const fetchNews = () => {
  return async (dispatch) => {
    try {
      // any async code you want!
      const response = await fetch("https://www.noarts.de/wp-json/wp/v2/posts?categories=1");

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const loadedNews = [];

      for (const key in resData) {
        loadedNews.push(
          new News(
            resData[key].id,
            resData[key].title.rendered,
            resData[key].featured_image_urls.medium,
            resData[key].content.rendered
          )
        );
      }

      dispatch({ type: SET_NEWS, news: loadedNews });
    } catch (err) {
      //
      throw err;
    }
  };
};

export const fetchNewsDetails = (postId) => {
  console.log(postId);
  return async (dispatch) => {
    try {
      // any async code you want!
      const response = await fetch("https://www.noarts.de/wp-json/wp/v2/posts/" + postId);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await response.json();
      loadedNews = new News(
        resData.id,
        resData.title.rendered,
        resData.featured_image_urls.large,
        resData.content.rendered
      );

      dispatch({ type: SET_NEWS_DETAILS, details: loadedNews });
    } catch (err) {
      //
      throw err;
    }
  };
};
