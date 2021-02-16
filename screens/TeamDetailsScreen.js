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
} from "react-native";
import * as Linking from "expo-linking";
import { FontAwesome5 } from "@expo/vector-icons";
import { getArtists } from "../store/ducks/artist";
import MarkdownView from "../components/MarkdownView";

import Colors from "../constants/Colors";

const TeamDetailsScreen = (props) => {
  const memberId = props.route.params.memberId;
  const memberName = props.route.params.memberName;

  const winDim = Dimensions.get("window");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const dispatch = useDispatch();

  const loadMember = useCallback(async () => {
    setError(null);
    setIsLoading(true);

    try {
      await dispatch(getArtists());
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    loadMember();
  }, [dispatch, loadMember]);
  const member = useSelector((state) =>
    state.artist.artists.find((artist2) => artist2.id === memberId)
  );
  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Ein Fehler ist aufgetreten!</Text>
        <Button
          title="Versuch es erneut."
          onPress={loadMember}
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

  if (!isLoading && member.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>Keine Daten gefunden.</Text>
      </View>
    );
  }

  const ratio = winDim.width / member.image_width;
  const imageStyle = {
    width: winDim.width,
    height: member.image_height * ratio,
  };

  const handlSocialClick = (url) => {
    if (url != "about:blank") {
      Linking.canOpenURL(url)
        .then((supported) => {
          if (!supported) {
            console.log("Can't handle url: " + url);
          } else {
            return Linking.openURL(url);
          }
        })
        .catch((err) => console.error("An error occurred", err));
    }
  };
  return (
    <ScrollView style={styles.memberDetails}>
      <Image
        resizeMode={"cover"}
        style={imageStyle}
        source={{ uri: member.image }}
      />
      {member.social.length > 0 && (
        <View style={styles.socialwall}>
          {member.social.map((s) => (
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
      {member.content && <MarkdownView>{member.content}</MarkdownView>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  memberDetails: {
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

export const screenOptions = (navData) => {
  return {
    headerTitle: navData.route.params.memberName,
  };
};

export default TeamDetailsScreen;
