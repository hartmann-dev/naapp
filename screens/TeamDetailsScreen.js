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
import AutoHeightWebView from "react-native-autoheight-webview";
import * as Linking from "expo-linking";
import { FontAwesome5 } from "@expo/vector-icons";
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

    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    loadMember();
  }, [dispatch, loadMember]);

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

  let webview;
  const handleNavigationStateChange = (event) => {
    if (event.url != "about:blank") {
      webview.stopLoading();
      Linking.openURL(event.url);
    }
  };
  const entities = new Entities();

  const handlSocialClick = (url) => {
    if (url != "about:blank") {
      webview.stopLoading();
      Linking.canOpenURL(url)
        .then((supported) => {
          if (!supported) {
            console.log("Can't handle url: " + url);
          } else {
            return Linking.openURL(url);
          }
        })
        .catch((err) => console.error("An error occurred", err));
      //Linking.openURL(url);
    }
  };

  return (
    <ScrollView style={styles.memberDetails}>
      {/* <View style={{ flex: 1, flexDirection: "column" }} pointerEvents={"none"} > */}

      <Image
        resizeMode={"cover"}
        style={imageStyle}
        source={{ uri: member.image }}
      />
      {(member.links.instagram ||
        member.links.facebook ||
        member.links.mailto) && (
        <View style={styles.socialwall}>
          {member.links.instagram && (
            <FontAwesome5
              name="instagram"
              size={48}
              color={Colors.accent}
              onPress={() => handlSocialClick(member.links.instagram)}
            />
          )}
          {member.links.facebook && (
            <FontAwesome5
              name="facebook"
              size={48}
              color={Colors.accent}
              onPress={() => handlSocialClick(member.links.facebook)}
            />
          )}
          {member.links.telegram && (
            <FontAwesome5
              name="telegram-plane"
              size={48}
              color={Colors.accent}
              onPress={() => handlSocialClick(member.links.telegram)}
            />
          )}
          {member.links.mailto && (
            <FontAwesome5
              name="envelope"
              size={48}
              color={Colors.accent}
              onPress={() => handlSocialClick("mailto:" + member.links.mailto)}
            />
          )}
        </View>
      )}
      <AutoHeightWebView
        style={{
          width: Dimensions.get("window").width - 30,
          margin: 15,
          height: winDim.width + 200,
        }}
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
      {/* </View> */}
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
    flex: 1,
    backgroundColor: Colors.primary,
    color: Colors.accent,
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 5,
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
