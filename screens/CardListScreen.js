import React from "react";
import { useSelector } from "react-redux";
import Cardlist from "../components/card/list";
import Carditem from "../components/card/item";

import { getArticles } from "../store/ducks/articles";
import { getGalleries } from "../store/ducks/galleries";

const CardListScreen = (props) => {
  const type = props.route.params.type;

  const dispatchers = {
    getArticles: getArticles(),
    getGalleries: getGalleries(),
  };

  const dispatcher = props.route.params.dispatcher;
  const sort = props.route.params.sort;

  let data;
  switch (dispatcher) {
    case "getArticles":
      data = useSelector((state) => state.articles.articles).filter((article) => article.type == type);
      break;
    case "getGalleries":
      data = useSelector((state) => state.galleries.galleries);
      break;
  }

  if (sort && sort == "desc") {
    data.reverse();
  }

  const selectItemHandler = (slug, title) => {
    props.navigation.navigate(props.route.params.subScreen, {
      slug,
      title,
    });
  };
  return (
    <Cardlist
      type={"card"}
      loadData={dispatchers[dispatcher]}
      data={data}
      renderGridItem={(itemData) => (
        <Carditem
          image={itemData.item.image}
          title={itemData.item.title}
          onViewDetail={() => {
            selectItemHandler(itemData.item.slug, itemData.item.title);
          }}
        />
      )}
    />
  );
};

export default CardListScreen;
