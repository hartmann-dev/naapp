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

import * as artistActions from "../store/actions/artist";

import Colors from "../constants/Colors";

const Entities = require("html-entities").AllHtmlEntities;

const TeamDetailsScreen = (props) => {
  const memberId = props.route.params.memberId;
  const memberName = props.route.params.memberName;

  const winDim = Dimensions.get("window");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const member = useSelector((state) => state.artist.memberDetails);
  const dispatch = useDispatch();
  const loadMember = useCallback(async () => {
    setError(null);
    setIsLoading(true);

    try {
      await dispatch(artistActions.fetchMemberDetails(memberId));
    } catch (err) {
      setError(err.message);
    }
    console.log(member);

    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    loadMember();
  }, [dispatch, loadMember]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button title="Try again" onPress={loadMember} color={Colors.primary} />
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
        <Text>No details found.</Text>
      </View>
    );
  }

  const ratio = winDim.width / member.image_width;
  const imageStyle = {
    width: winDim.width,
    height: member.image_height * ratio,
  };

  let webview;
  const handleNavigationStateChange = (event) => {
    if (event.url != "about:blank") {
      webview.stopLoading();
      Linking.openURL(event.url);
    }
  };
  const entities = new Entities();

  return (
    <ScrollView style={styles.memberDetails}>
      <Image resizeMode={"cover"} style={imageStyle} source={{ uri: member.image }} />
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
        source={{ html: entities.decode(member.content) }}
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
  memberDetails: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export const screenOptions = (navData) => {
  return {
    headerTitle: navData.route.params.memberName,
  };
};

export default TeamDetailsScreen;
