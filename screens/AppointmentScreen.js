import React from "react";
import { StyleSheet, Text, ScrollView } from "react-native";
import { MarkdownView } from "react-native-markdown-view";
import { Linking } from "react-native";

import Colors from "../constants/Colors";

const AppointmentScreen = (props) => {
  return (
    <ScrollView style={styles.appointment}>
      <MarkdownView
        onLinkPress={(url) => {
          Linking.openURL(url).catch((error) =>
            console.warn("An error occurred: ", error)
          );
        }}
        styles={{
          heading1: {
            fontSize: 28,
            fontFamily: "alien",
            marginTop: 20,
            marginBottom: 10,
          },
          link: {
            color: Colors.primary,
          },
          paragraph: {
            lineHeight: 20,
            marginTop: 10,
            marginBottom: 10,
          },
        }}
      >
        Kommt **jeden ersten Freitag im Monat** ganz ohne Termin zwischen 10.00
        h und 18.00 h vorbei, um Eure Ideen zu besprechen und unser Studio
        anzuschauen. Wir nehmen uns Zeit, um Eure Vorstellungen bestmöglich
        umzusetzen. Selbstverständlich arbeiten wir nach den neusten
        hygienischen Standards und komplett mit Einwegmaterial. {"\n"}
        {"\n"}# Portraitfotos von euren Lieben{"\n"}
        Ihr möchtet ein Portraittattoo von Euren Lieben (Zwei- oder Vierbeiner),
        aber Ihr habt einfach nicht die perfekte Vorlage? Wir bieten Euch ab
        sofort die Möglichkeit, individuelle Portraitfotos in unserem Fotostudio
        machen zu lassen, perfekt ausgeleuchtet, um als Tattoovorlage verwendet
        zu werden. {"\n"}Für Preise und Ablauf sprecht uns einfach an.{"\n"}
        {"\n"}# Termine bei Ralf{"\n"}
        **Die nächste Terminvergabe wird an dieser Stelle bekannt gegeben.**
        {"\n"}
        Oder auf: [noarts.de](https://www.noarts.de/termine/) {"\n"}
        {"\n"}Das Formular wird nur eine begrenzte Zeit online sein. Das
        Ausfüllen und Abschicken des Formulars bedeutet keine Termingarantie.
        Sollten wir uns nicht innerhalb der nächsten Wochen bei Euch gemeldet
        haben, dann nicht enttäuscht sein und es einfach beim nächsten Mal
        wieder probieren.
        {"\n"}
        {"\n"}# Termine bei Katrin und Patrick{"\n"}
        Die Termine bei Katrin und Patrick könnt Ihr jeden ersten Freitag
        zwischen 10.00 h und 18.00 h im Studio vereinbaren, vorab könnt Ihr auch
        gerne per e-Mail oder telefonisch nachfragen.
        {"\n"}
      </MarkdownView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  appointment: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 5,
    paddingHorizontal: 15,
    paddingBottom: 100,
  },
});

export default AppointmentScreen;
