import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View, ScrollView, FlatList, ActivityIndicator, Button, Image } from "react-native";
import { WebView } from "react-native-webview";

import * as newsActions from "../store/actions/news";

import NewsItem from "../components/news/NewsItem";
import Colors from "../constants/Colors";

const NewsDetailsScreen = (props) => {
  const newsId = props.route.params.newsId;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const news = useSelector((state) => state.news.newsDetails);
  const dispatch = useDispatch();
  const loadNews = useCallback(async () => {
    setError(null);
    setIsLoading(true);

    try {
      console.log(newsId);
      await dispatch(newsActions.fetchNewsDetails(newsId));
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    loadNews();
  }, [dispatch, loadNews]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button title="Try again" onPress={loadNews} color={Colors.primary} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && news.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No news found.</Text>
      </View>
    );
  }
  return <WebView originWhitelist={["*"]} source={{ html: news.body }} />;
};

const styles = StyleSheet.create({
  news: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default NewsDetailsScreen;
