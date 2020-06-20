import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View, ActivityIndicator, Button } from "react-native";
import GallerySwiper from "react-native-gallery-swiper";

import * as galleryActions from "../store/actions/gallery";

import Colors from "../constants/Colors";

const GalleryDetailsScreen = (props) => {
  const imageId = props.route.params.imageId;
  const galleryId = props.route.params.galleryId;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [position, setPostion] = useState(0);

  const images = useSelector((state) => state.gallery.images);
  const dispatch = useDispatch();
  const loadImages = useCallback(async () => {
    setError(null);
    setIsLoading(true);

    try {
      await dispatch(galleryActions.fetchImages(galleryId));
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    loadImages();
    const index = images.findIndex((image) => image.id === imageId);
    if (index >= 0)
      setPostion(index);
  }, [dispatch, loadImages]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button title="Try again" onPress={loadImages} color={Colors.primary} />
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

  if (!isLoading && images.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No images found.</Text>
      </View>
    );
  }
  return (
    <GallerySwiper images={images} sensitiveScroll={false} initialNumToRender={position + 1} initialPage={position} />
  );
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default GalleryDetailsScreen;
