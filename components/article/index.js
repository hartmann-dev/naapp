import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Button, Image, Dimensions } from "react-native";
import Toast from "react-native-root-toast";

import Colors from "../../constants/Colors";
import { useIsMountedRef } from "../../utils/hooks";
import MarkdownView from "../../components/MarkdownView";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Linking from "expo-linking";

import BackgroundView from "../BackgroundView";

const Article = ({ data, load, navigation }) => {
  const winDim = Dimensions.get("window");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const isMountedRef = useIsMountedRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data !== undefined) loadData();
  }, []);

  const loadData = useCallback(async () => {
    if (isMountedRef.current) {
      setError(null);

      try {
        if (load) await dispatch(load);
        if (load) {
          await dispatch(load);
        }
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
  let imageStyle = { width: winDim.width };
  if (data?.image) {
    const ratio = winDim.width / data.image.dimensions.width;
    imageStyle.height = data.image.dimensions.height * ratio;
  }

  const handlSocialClick = (url) => {
    if (url != "about:blank") {
      if (url.indexOf("@") > 0) {
        url = "mailto:" + url;
      }
      Linking.canOpenURL(url)
        .then((supported) => {
          if (!supported) {
            console.log("Can't handle URL: " + url);
            let toast = Toast.show("Ein Fehler ist aufgetreten.\nKeine App für\n" + url + "\ngefunden.", {
              duration: Toast.durations.LONG,
              position: 100,
              backgroundColor: "#ff0000",
              textColor: "#fff",
              opacity: 1,
            });
          } else {
            return Linking.openURL(url);
          }
        })
        .catch((err) => console.error("Ein Fehler ist aufgetreten", err));
    }
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Ein Fehler ist aufgetreten</Text>
        <Button title="Erneut versuchen" onPress={loadData} color={Colors.primary} />
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
        <Button title="Erneut versuchen" onPress={loadData} color={Colors.primary} />
      </View>
    );
  }
  if (!isLoading && data) {
    return (
      <View style={styles.wrapper}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <BackgroundView>
            {data.image && <Image resizeMode={"cover"} style={imageStyle} source={{ uri: data.image.url }} />}
            {data.social.length > 0 && (
              <View style={styles.socialwall}>
                {data.social.map((s) => (
                  <View style={styles.socialitem} key={s.link}>
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
            {data.date && (
              <View style={styles.date}>
                <Text style={styles.datetext}>{data.date}</Text>
              </View>
            )}
            {data.content && <MarkdownView navigation={navigation}>{data.content}</MarkdownView>}
          </BackgroundView>
        </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.background,
    flex: 1,
    height: "100%",
    minHeight: "100%",
    width: "100%",
    minWidth: "100%",
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
  date: {
    backgroundColor: Colors.primary,
    color: Colors.accent,
    padding: 5,
  },
  datetext: {
    color: Colors.accent,
    padding: 5,
    fontSize: 25,
    fontFamily: "alien",
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
