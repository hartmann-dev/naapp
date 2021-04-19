import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Button,
} from "react-native";
import GallerySwiper from "react-native-gallery-swiper";

import Colors from "../constants/Colors";

const ImageScreen = (props) => {
  const imageId = props.route.params.id;
  const slug = props.route.params.slug;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [position, setPostion] = useState(0);

  const images = useSelector((state) => state.galleries.galleries).find(
    (gallery) => gallery.slug == slug
  ).content;

  const dispatch = useDispatch();
  const loadImages = useCallback(async () => {
    setError(null);
    setIsLoading(true);

    try {
      //await dispatch(galleryActions.fetchImages(galleryId));
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    loadImages();
    const index = images.findIndex((image) => image.id === imageId);
    if (index >= 0) setPostion(index);
  }, [dispatch, images]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Ein Fehler ist aufgetreten!</Text>
        <Button
          title="Versuch es erneut"
          onPress={loadImages}
          color={Colors.primary}
        />
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
        <Text>Kein Bild gefunden.</Text>
      </View>
    );
  }
  return (
    <GallerySwiper
      images={images}
      sensitiveScroll={false}
      initialNumToRender={position + 1}
      initialPage={position}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
});

export default ImageScreen;
