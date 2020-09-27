import React from "react";
import { useSelector } from "react-redux";
import Cardlist from "../components/cardlist/cardlist"

import * as newsActions from "../store/actions/news";

import NewsItem from "../components/news/NewsItem";

const NewsScreen = (props) => {
  const news = useSelector((state) => state.news.availableNews);
 
 
  const selectItemHandler = (id, title) => {
    props.navigation.navigate("NewsDetails", {
      newsId: id,
      newsTitle: title,
    });
  };

  
  return (

    <Cardlist
        type="news"
        loadData={newsActions.fetchNews()}
        data={news}
        renderGridItem={(itemData) => (
          <NewsItem
            image={itemData.item.image}
            title={itemData.item.title}
            onViewDetail={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
        )}
      />
  );
};


export default NewsScreen;
