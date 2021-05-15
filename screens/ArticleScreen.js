import React from "react";
import { useSelector } from "react-redux";

import Article from "../components/article";

import { getArticles } from "../store/ducks/articles";

const ArticleScreen = (props) => {
  const slug = props.route.params.slug;
  const data = useSelector((state) => state.articles.articles).find(
    (article) => article.slug == slug
  );
  return <Article loadData={getArticles()} data={data} />;
};

export default ArticleScreen;
