import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Button, Dimensions } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";

import { useIsMountedRef } from "../../utils/hooks";
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
  const isMountedRef = useIsMountedRef();

  useEffect(() => {
    if (isMountedRef.current) {
      ScreenOrientation.getOrientationAsync().then((info) => {
        setOrientation(info);
        calcNumCols();
      });

      const subscription = ScreenOrientation.addOrientationChangeListener((evt) => {
        setOrientation(evt.orientationInfo.orientation);
        calcNumCols();
      });

      return () => {
        ScreenOrientation.removeOrientationChangeListener(subscription);
      };
    }
  }, []);

  const calcNumCols = useCallback(() => {
    const { width } = Dimensions.get("window");
    console.log(width);
    const itemWidth = 110;
    if (isMountedRef.current) {
      setNumCols(Math.floor(width / itemWidth));
    }
  }, [orientation]);

  const loadThumbnails = useCallback(async () => {
    if (isMountedRef.current) {
      setError(null);
      setIsRefreshing(true);

      try {
        await dispatch(galleryActions.fetchThumbnails(props.galleryId));
      } catch (err) {
        setError(err.message);
      }
      setIsRefreshing(false);
    }
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    if (isMountedRef.current) {
      setIsLoading(true);
      loadThumbnails().then(() => {
        setIsLoading(false);
      });
    }
  }, [dispatch, loadThumbnails]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("GalleryDetails", {
      imageId: id,
      galleryId: props.galleryId,
    });
  };

  if (error) {
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
