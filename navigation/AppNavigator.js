import React from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import * as Linking from "expo-linking";

import { FontAwesome5 } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import NewsScreen from "../screens/NewsScreen";
import NewsDetailsScreen, {
  screenOptions as NewsDetailsScreenOptions,
} from "../screens/NewsDetailsScreen";
import GalleryDetailsScreen from "../screens/GalleryDetailsScreen";
import TeamScreen from "../screens/TeamScreen";
import TeamDetailsScreen, {
  screenOptions as TeamDetailsScreenOptions,
} from "../screens/TeamDetailsScreen";
import GuestsScreem from "../screens/GuestsScreen";
import AppointmentScreen from "../screens/AppointmentScreen";
import FAQScreen from "../screens/FAQScreen";
import ContactScreen from "../screens/ContactScreen";
import LegalNoticeScreen from "../screens/LegalNoticeScreen";
import PrivacyScreen from "../screens/PrivacyScreen";
import ShopScreen from "../screens/ShopScreen";

import GalleryTabNavigator from "./GalleryTabNavigator";

import Colors from "../constants/Colors";

const StackNav = createStackNavigator();

const AppStackNavigator = () => {
  return (
    <StackNav.Navigator
      initialRouteName="Home"
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
            <TouchableOpacity
              style={{ paddingRight: 20 }}
              onPress={() => navigation.toggleDrawer()}
            >
              <FontAwesome5 name="bars" size={18} color={Colors.accent} />
            </TouchableOpacity>
          );
        },
      })}
    >
      <StackNav.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "NoArts!" }}
      />
      <StackNav.Screen name="News" component={NewsScreen} />
      <StackNav.Screen
        name="NewsDetails"
        component={NewsDetailsScreen}
        options={NewsDetailsScreenOptions}
      />
      <StackNav.Screen
        name="Gallery"
        component={GalleryTabNavigator}
        options={{ title: "Bilder" }}
      />
      <StackNav.Screen
        name="GalleryDetails"
        component={GalleryDetailsScreen}
        options={{ title: "" }}
      />
      <StackNav.Screen name="Team" component={TeamScreen} />
      <StackNav.Screen
        name="TeamDetails"
        component={TeamDetailsScreen}
        options={TeamDetailsScreenOptions}
      />

      <StackNav.Screen
        name="Guests"
        component={GuestsScreem}
        options={{ title: "Gäste" }}
      />
      <StackNav.Screen
        name="Appointments"
        component={AppointmentScreen}
        options={{ title: "Termine" }}
      />
      <StackNav.Screen
        name="Contact"
        component={ContactScreen}
        options={{ title: "Kontakt" }}
      />
      {/* <StackNav.Screen name="FAQ" component={FAQScreen} /> */}
      <StackNav.Screen
        name="LegalNotice"
        component={LegalNoticeScreen}
        options={{ title: "Impressum" }}
      />
      <StackNav.Screen
        name="Privacy"
        component={PrivacyScreen}
        options={{ title: "Datenschutz" }}
      />
      <StackNav.Screen name="Shop" component={ShopScreen} />
    </StackNav.Navigator>
  );
};

const Drawer = createDrawerNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
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
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate("NoArts!", { screen: "Home" })
                  }
                >
                  <View style={styles.item}>
                    <View style={styles.iconContainer}>
                      <FontAwesome5
                        name="home"
                        size={24}
                        color={Colors.primary}
                      />
                    </View>
                    <Text style={styles.label}>NoArts!</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate("NoArts!", { screen: "News" })
                  }
                >
                  <View style={styles.item}>
                    <View style={styles.iconContainer}>
                      <FontAwesome5
                        name="exclamation"
                        size={24}
                        color={Colors.primary}
                      />
                    </View>
                    <Text style={styles.label}>News</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate("NoArts!", { screen: "Gallery" })
                  }
                >
                  <View style={styles.item}>
                    <View style={styles.iconContainer}>
                      <FontAwesome5
                        name="camera-retro"
                        size={24}
                        color={Colors.primary}
                      />
                    </View>
                    <Text style={styles.label}>Bilder</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate("NoArts!", { screen: "Team" })
                  }
                >
                  <View style={styles.item}>
                    <View style={styles.iconContainer}>
                      <FontAwesome5
                        name="users"
                        size={24}
                        color={Colors.primary}
                      />
                    </View>
                    <Text style={styles.label}>Team</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate("NoArts!", { screen: "Guests" })
                  }
                >
                  <View style={styles.item}>
                    <View style={styles.iconContainer}>
                      <FontAwesome5
                        name="suitcase-rolling"
                        size={24}
                        color={Colors.primary}
                      />
                    </View>
                    <Text style={styles.label}>Gäste</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate("NoArts!", {
                      screen: "Appointments",
                    })
                  }
                >
                  <View style={styles.item}>
                    <View style={styles.iconContainer}>
                      <FontAwesome5
                        name="calendar-check"
                        size={24}
                        color={Colors.primary}
                      />
                    </View>
                    <Text style={styles.label}>Termine</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    //props.navigation.navigate("NoArts!", { screen: "Home" })
                    Linking.openURL("https://www.noarts.de/shop/")
                  }
                >
                  <View style={styles.item}>
                    <View style={styles.iconContainer}>
                      <FontAwesome5
                        name="tint"
                        size={24}
                        color={Colors.primary}
                      />
                    </View>
                    <Text style={styles.label}>Shop</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate("NoArts!", { screen: "Contact" })
                  }
                >
                  <View style={styles.item}>
                    <View style={styles.iconContainer}>
                      <FontAwesome5
                        name="envelope-open-text"
                        size={24}
                        color={Colors.primary}
                      />
                    </View>
                    <Text style={styles.label}>Kontakt</Text>
                  </View>
                </TouchableOpacity>
              </SafeAreaView>
              <View>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate("NoArts!", { screen: "Privacy" })
                  }
                >
                  <View style={styles.item}>
                    <View style={styles.iconContainer}>
                      <FontAwesome5
                        name="shield-alt"
                        size={24}
                        color={Colors.primary}
                      />
                    </View>
                    <Text style={styles.label}>Datenschutz</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate("NoArts!", {
                      screen: "LegalNotice",
                    })
                  }
                >
                  <View style={styles.item}>
                    <View style={styles.iconContainer}>
                      <FontAwesome5
                        name="gavel"
                        size={24}
                        color={Colors.primary}
                      />
                    </View>
                    <Text style={styles.label}>Impressum</Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.item}>
                  <Text style={styles.labelSmall}>v0.5.3</Text>
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
          name="NoArts!"
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
