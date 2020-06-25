import React from "react";
import { StyleSheet, Text, ScrollView } from "react-native";

import Colors from "../constants/Colors";

const AppointmentScreen = (props) => {
  return (
    <ScrollView style={styles.appointment}>
      <Text>
        Kommt <Text style={styles.bold}>jeden ersten Freitag im Monat</Text> ganz ohne Termin zwischen 10.00 h und 18.00
        h vorbei, um Eure Ideen zu besprechen und unser Studio anzuschauen. Wir nehmen uns Zeit, um Eure Vorstellungen
        bestmöglich umzusetzen. Selbstverständlich arbeiten wir nach den neusten hygienischen Standards und komplett mit
        Einwegmaterial.
      </Text>
      <Text style={styles.header}>Portraitfotos von euren Lieben</Text>
      <Text>
        Ihr möchtet ein Portraittattoo von Euren Lieben (Zwei- oder Vierbeiner), aber Ihr habt einfach nicht die
        perfekte Vorlage? Wir bieten Euch ab sofort die Möglichkeit, individuelle Portraitfotos in unserem Fotostudio
        machen zu lassen, perfekt ausgeleuchtet, um als Tattoovorlage verwendet zu werden. {"\n"}Für Preise und Ablauf
        sprecht uns einfach an.
      </Text>
      <Text style={styles.header}>Termine bei Ralf</Text>
      <Text style={styles.bold}>
        Die nächste Terminvergabe wird am 11. September 2020 um 20.00 Uhr auf noarts.de stattfinden.
      </Text>
      <Text>
        Das Formular wird nur eine begrenzte Zeit online sein. Das Ausfüllen und Abschicken des Formulars bedeutet keine
        Termingarantie. Sollten wir uns nicht innerhalb der nächsten Wochen bei Euch gemeldet haben, dann nicht
        enttäuscht sein und es einfach beim nächsten Mal wieder probieren.
      </Text>
      <Text style={styles.header}>Termine bei Katrin und Patrick</Text>
      <Text>
        Die Termine bei Katrin und Patrick könnt Ihr jeden ersten Freitag zwischen 10.00 h und 18.00 h im Studio
        vereinbaren, vorab könnt Ihr auch gerne per e-Mail oder telefonisch nachfragen.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  appointment: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 15,
    paddingBottom: 200,
  },
  bold: {
    fontWeight: "bold",
  },
  header: {
    fontSize: 28,
    fontFamily: "alien",
    marginTop: 20,
    marginBottom: 10,
  },
});

export default AppointmentScreen;
