import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  ActivityIndicator,
  Button,
  Image,
  Dimensions,
  Linking,
} from "react-native";
import AutoHeightWebView from "react-native-autoheight-webview";

import * as newsActions from "../store/actions/news";

import Colors from "../constants/Colors";
import { WebView } from "react-native-webview";

const NewsDetailsScreen = (props) => {
  const newsId = props.route.params.newsId;
  const newsTitle = props.route.params.newsId;

  const winDim = Dimensions.get("window");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const news = useSelector((state) => state.news.newsDetails);
  const dispatch = useDispatch();
  const loadNews = useCallback(async () => {
    setError(null);
    setIsLoading(true);

    try {
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

  const ratio = winDim.width / news.image_width;
  const imageStyle = {
    width: winDim.width,
    height: news.image_height * ratio,
  };

  let webview;
  const handleNavigationStateChange = (event) => {
    if (event.url != "about:blank") {
      webview.stopLoading();
      Linking.openURL(event.url);
    }
  };

  let imageOrVideo = <Image resizeMode={"cover"} style={imageStyle} source={{ uri: news.image }} />;
  console.log(news.video);
  if (news.video) {
    imageOrVideo = (
      <WebView
        style={{ flex: 1, height: 300 }}
        javaScriptEnabled={true}
        allowsFullscreenVideo={true}
        source={{
          uri: "https://www.youtube.com/embed/" + news.video + "?rel=0&autoplay=0&showinfo=0&controls=1&fullscreen=1",
        }}
      />
    );
  }

  return (
    <ScrollView style={styles.newsDetails}>
      {imageOrVideo}

      <Text style={styles.newsDate}>{news.date}</Text>
      <AutoHeightWebView
        style={{ width: Dimensions.get("window").width - 30, margin: 15 }}
        customStyle={` 
          p {
            font-size: 18px;
            line-height: 1.6;
            color: black;

          }
          a {
            color: ${Colors.primary};
          }
        `}
        files={[
          {
            href: "cssfileaddress",
            type: "text/css",
            rel: "stylesheet",
          },
        ]}
        source={{ html: news.tmp }}
        scalesPageToFit={true}
        viewportContent={"width=device-width, user-scalable=no"}
        ref={(ref) => {
          webview = ref;
        }}
        onNavigationStateChange={handleNavigationStateChange}
      />
    </ScrollView>
  );
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
    color: Colors.accent,
  },
  newsContent: {},
  newsContentText: {
    paddingTop: 15,
  },

  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export const screenOptions = (navData) => {
  return {
    headerTitle: navData.route.params.newsTitle,
  };
};

export default NewsDetailsScreen;
