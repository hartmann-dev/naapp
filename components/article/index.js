import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Button,
  Image,
  Dimensions,
} from "react-native";
import Colors from "../../constants/Colors";
import { useIsMountedRef } from "../../utils/hooks";
import MarkdownView from "../../components/MarkdownView";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Linking from "expo-linking";

import BackgroundView from "../BackgroundView";

const Article = ({ data, load }) => {
  const winDim = Dimensions.get("window");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const isMountedRef = useIsMountedRef();
  const dispatch = useDispatch();

  const loadData = useCallback(async () => {
    if (isMountedRef.current) {
      setError(null);

      try {
        if (load) await dispatch(load);
      } catch (err) {
        console.log(err);
        setError(err.message);
      }
    }
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    if (isMountedRef.current) {
      setIsLoading(true);
      loadData().then(() => {
        setIsLoading(false);
      });
    }
  }, [dispatch, loadData]);

  const ratio = winDim.width / member.image_width;
  const imageStyle = {
    width: winDim.width,
    height: member.image_height * ratio,
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Ein Fehler ist aufgetreten</Text>
        <Button
          title="Erneut versuchen"
          onPress={loadData}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.wrapper}>
        <BackgroundView>
          <View style={styles.centered}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        </BackgroundView>
      </View>
    );
  }
  if (!isLoading && data == null) {
    return (
      <View style={styles.centered}>
        <Text>Keine Daten gefunden</Text>
        <Button
          title="Erneut versuchen"
          onPress={loadData}
          color={Colors.primary}
        />
      </View>
    );
  }
  console.log(data);
  if (!isLoading) {
    return (
      <ScrollView style={styles.wrapper}>
        <BackgroundView>
          {data.image && (
            <Image
              resizeMode={"cover"}
              style={imageStyle}
              source={{ uri: data.image }}
            />
          )}
          {data.social.length > 0 && (
            <View style={styles.socialwall}>
              {data.social.map((s) => (
                <View style={styles.socialitem}>
                  <FontAwesome5
                    name={s.appIcon}
                    size={48}
                    color={Colors.accent}
                    onPress={() => handlSocialClick(s.link)}
                  />
                </View>
              ))}
            </View>
          )}
          {data.content && <MarkdownView>{data.content}</MarkdownView>}
        </BackgroundView>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.background,
    flex: 1,
    height: "100%",
  },
  list: { flex: 1, display: "flex", justifyContent: "center" },

  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  details: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  button: {
    marginVertical: 10,
  },
  socialwall: {
    display: "flex",
    backgroundColor: Colors.primary,
    color: Colors.accent,
    flexDirection: "row",
    padding: 5,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  socialitem: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
});

export default Article;
