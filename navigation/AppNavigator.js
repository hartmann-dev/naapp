import React from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
  Text,
  StyleSheet,
} from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import * as Linking from "expo-linking";
import * as Notifications from "expo-notifications";
import { useSelector } from "react-redux";

import { FontAwesome5 } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import ArticleScreen from "../screens/ArticleScreen";
import CardListScreen from "../screens/CardListScreen";
import GalleryScreen from "../screens/GalleryScreen";
import ImageScreen from "../screens/ImageScreen";

import Versionhint from "../components/Versionhint";

import Colors from "../constants/Colors";

const NoArtsTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.background,
  },
};
const StackNav = createStackNavigator();

const AppStackNavigator = () => {
  return (
    <StackNav.Navigator
      initialRouteName="NoArts!"
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: Colors.accent,
        headerTitleStyle: {
          fontFamily: "alien",
          fontSize: 24,
        },
        headerRight: () => {
          return (
            <Pressable
              style={{ paddingRight: 20 }}
              onPress={() => navigation.toggleDrawer()}
            >
              <FontAwesome5 name="bars" size={18} color={Colors.accent} />
            </Pressable>
          );
        },
      })}
    >
      <StackNav.Screen name="NoArts!" component={HomeScreen} />
      <StackNav.Screen
        name="Article"
        component={ArticleScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
      <StackNav.Screen
        name="CardList"
        component={CardListScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
      <StackNav.Screen
        name="Gallery"
        component={GalleryScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
      <StackNav.Screen
        name="Image"
        component={ImageScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
    </StackNav.Navigator>
  );
};

const Drawer = createDrawerNavigator();
const AppNavigator = () => {
  const nav = useSelector((state) => state.config.navigation);

  const prefix = Linking.createURL("/");

  return (
    <NavigationContainer
      theme={NoArtsTheme}
      linking={{
        prefixes: [prefix],
        config: {
          screens: {
            Drawer: { screens: { Article: "article/:slug/:title" } },
          },
        },
        subscribe(listener) {
          const onReceiveURL = ({ url }) => listener(url);
          // const onReceiveURL = (event) => {
          //   console.log(event);
          //   listener(event.url);
          // };

          // Listen to incoming links from deep linking
          Linking.addEventListener("url", onReceiveURL);

          // Listen to expo push notifications
          const subscription = Notifications.addNotificationResponseReceivedListener(
            (response) => {
              const slug = response.notification.request.content.data.slug;
              const title = response.notification.request.content.data.title;

              const url = `/article/${slug}/${title}`;
              listener(Linking.createURL(url));
            }
          );

          return () => {
            // Clean up the event listeners
            Linking.removeEventListener("url", onReceiveURL);
            subscription.remove();
          };
        },
      }}
    >
      <Drawer.Navigator
        drawerContent={(props) => {
          return (
            <ScrollView
              contentContainerStyle={{
                paddingTop: 50,
                flex: 1,
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: Colors.background,
              }}
            >
              <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
                {nav.main?.map((item) => {
                  return (
                    <Pressable
                      onPress={() =>
                        props.navigation.navigate("Drawer", {
                          screen: item.screen,
                          params: {
                            title: item.title,
                            type: item.type,
                            subScreen: item.subScreen,
                            dispatcher: item.dispatcher,
                            slug: item.slug,
                          },
                        })
                      }
                      key={item.id}
                    >
                      <View style={styles.item}>
                        <View style={styles.iconContainer}>
                          <FontAwesome5
                            name={item.icon}
                            size={24}
                            color={Colors.primary}
                          />
                        </View>
                        <Text style={styles.label}>{item.title}</Text>
                      </View>
                    </Pressable>
                  );
                })}
              </SafeAreaView>
              <View>
                {nav.second?.map((item) => {
                  return (
                    <Pressable
                      onPress={() =>
                        props.navigation.navigate("Drawer", {
                          screen: item.screen,
                          title: item.title,
                          subScreen: item.subSCreen,
                          dispatcher: item.dispatcher,
                          slug: item.slug,
                        })
                      }
                      key={item.id}
                    >
                      <View style={styles.item}>
                        <View style={styles.iconContainer}>
                          <FontAwesome5
                            name={item.icon}
                            size={24}
                            color={Colors.primary}
                          />
                        </View>
                        <Text style={styles.label}>{item.title}</Text>
                      </View>
                    </Pressable>
                  );
                })}

                <View style={styles.item}>
                  <Versionhint />
                </View>
              </View>
            </ScrollView>
          );
        }}
        drawerContentOptions={{
          activeTintColor: Colors.primary,
        }}
      >
        <Drawer.Screen
          name="Drawer"
          component={AppStackNavigator}
          options={{
            drawerIcon: (props) => (
              <FontAwesome5 name="home" size={24} color={Colors.primary} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    margin: 16,
    color: Colors.primary,
  },
  labelSmall: {
    margin: 10,
    color: Colors.primary,
    fontSize: 10,
  },
  iconContainer: {
    marginHorizontal: 16,
    width: 30,
    alignItems: "center",
  },

  icon: {
    width: 24,
    height: 24,
  },
});

export default AppNavigator;
