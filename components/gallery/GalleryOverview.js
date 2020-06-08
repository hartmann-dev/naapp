import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Button, Dimensions } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";

import * as galleryActions from "../../store/actions/gallery";

import ThumbnailItem from "../../components/gallery/ThumbnailItem";
import Colors from "../../constants/Colors";

const GalleryOverview = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [orientation, setOrientation] = useState(1);
  const [numCols, setNumCols] = useState(3);

  const [error, setError] = useState();
  const thumbnails = useSelector((state) => state.gallery.thumbnails);
  const dispatch = useDispatch();

  useEffect(() => {
    ScreenOrientation.getOrientationAsync().then((info) => {
      console.log("useEffect " + info);
      setOrientation(info);
      calcNumCols();
    });

    const subscription = ScreenOrientation.addOrientationChangeListener((evt) => {
      console.log("subscription " + evt.orientationInfo.orientation);
      setOrientation(evt.orientationInfo.orientation);
      calcNumCols();
    });

    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);

  const calcNumCols = useCallback(() => {
    const { width } = Dimensions.get("window");
    const itemWidth = 130;
    console.log("calcNumCols " + width);

    setNumCols(Math.floor(width / itemWidth));
  }, [orientation]);

  const loadThumbnails = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    console.log("loadThumbnails");
    try {
      await dispatch(galleryActions.fetchThumbnails(props.galleryId));
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    setIsLoading(true);
    loadThumbnails().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadThumbnails]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("GalleryDetails", {
      imageId: id,
    });
  };

  if (error) {
    console.log(error);
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button title="Try again" onPress={loadThumbnails} color={Colors.primary} />
      </View>
    );
  }

  if (isLoading || orientation === "undefined") {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && thumbnails.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No images found.</Text>
      </View>
    );
  }
  if (!isLoading || orientation !== "undefined") {
    console.log("render");
    return (
      <View style={styles.thumbnails}>
        <FlatList
          onRefresh={loadThumbnails}
          columnWrapperStyle={styles.list}
          refreshing={isRefreshing}
          data={thumbnails}
          key={orientation * numCols}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numCols}
          renderItem={(itemData) => (
            <ThumbnailItem
              uri={itemData.item.uri}
              onViewDetail={() => {
                selectItemHandler(itemData.item.id);
              }}
            />
          )}
        />
      </View>
    );
  }
};
const styles = StyleSheet.create({
  thumbnails: {
    backgroundColor: Colors.background,
    flexDirection: "row",
    height: "100%",
  },
  list: { flex: 1, justifyContent: "space-around" },

  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default GalleryOverview;
