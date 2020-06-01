import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, ScrollView, View, ActivityIndicator, Button, Image, Dimensions, Linking } from "react-native";
import { WebView } from "react-native-webview";
import MyWebView from 'react-native-webview-autoheight';

import * as newsActions from "../store/actions/news";

import Colors from "../constants/Colors";

const NewsDetailsScreen = (props) => {
  const newsId = props.route.params.newsId;
  const newsTitle = props.route.params.newsId;

  const winDim = Dimensions.get('window');


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
  let content = news.content.split('<br />').map((item, i) => {
    return item != "" ? <Text style={styles.newsContentText} key={i}>{item}</Text> : null;
  });
  const ratio = winDim.width / news.image_width;
  const imageStyle = {
    width: winDim.width,
    height: news.image_height * ratio,
  }
  const customStyle = "<style type=\"text/css\"> "
    + "body {font-family: sans-serif; background-color: " + Colors.background + "} "
    + "p {font-size: 18px} "
    + "a {color: " + Colors.primary + "  }"
    + "h1,h2,h3,h4 {font-family: alien, sans-serif !important; }"

    + "</style>";
  let webview;
  const handleNavigationStateChange = (event) => {
    if (event.url != 'about:blank') {
      webview.stopLoading();
      Linking.openURL(event.url);
    }
  };
  return <ScrollView style={styles.newsDetails} >
    <Image resizeMode={'cover'} style={imageStyle} source={{ uri: news.image }} />
    <Text style={styles.newsDate}>{news.date}</Text>
    <MyWebView scrollEnabled={true} originWhitelist={['*']}
      ref={(ref) => { webview = ref; }}
      onNavigationStateChange={handleNavigationStateChange}
      containerStyle={styles.newsContent} source={{ html: '<html><head>' + customStyle + '<meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>' + news.tmp + '</body></html>' }} />
  </ScrollView>;
};

const styles = StyleSheet.create({
  newsDetails: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  newsDate: {
    fontSize: 20,
    padding: 15,
    backgroundColor: Colors.primary,
    color: Colors.accent
  },
  newsContent: {


  },
  newsContentText: {
    paddingTop: 15,

  },

  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export const screenOptions = navData => {
  return {
    headerTitle: navData.route.params.newsTitle
  };
};

export default NewsDetailsScreen;
