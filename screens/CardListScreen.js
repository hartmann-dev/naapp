import React from "react";
import { useSelector } from "react-redux";
import Cardlist from "../components/card/list";
import Carditem from "../components/card/item";

import { getArticles } from "../store/ducks/articles";

const CardListScreen = (props) => {
  const type = props.route.params.type;
  const data = useSelector((state) => state.articles.articles).filter(
    (article) => article.type == type
  );
  const selectItemHandler = (slug, title) => {
    props.navigation.navigate("Article", {
      slug,
      title,
    });
  };
  return (
    <Cardlist
      type={"card"}
      loadData={getArticles()}
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
