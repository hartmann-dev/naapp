import React from "react";
import { StyleSheet, Text, ScrollView } from "react-native";

import Colors from "../constants/Colors";

const LegalNoticeScreen = (props) => {
  return (
    <ScrollView style={styles.notice}>
      <Text style={styles.header}>Impressum</Text>
      <Text style={styles.bold}>
        Angaben gemäß § 5 TMG und Art. 4 Nr.7 DS-GVO:
      </Text>
      <Text style={styles.bold}>
        Betreiber:
      </Text>
      <Text>
        NoArts! Tattoo Ralf Nonnweiler{"\n"}
        Bürgermeister-Regitz-Straße 27{"\n"}
        66539 Neunkirchen{"\n"}
        {"\n"}
        Vertreten durch:{"\n"}
        Ralf Nonnweiler{"\n"}
        {"\n"}
        Kontakt:{"\n"}
        Telefon: +49 (0) 68 21-309 32 20{"\n"}
        E-Mail: info@noarts.de{"\n"}
        {"\n"}
        Umsatzsteuer-ID:{"\n"}
        Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz: DE 251182984{"\n"}
        {"\n"}
        Wirtschafts-ID:{"\n"}
        Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:{"\n"}
        Ralf Nonnweiler{"\n"}
        Bürgermeister-Regitz-Straße 27{"\n"}
        66539 Neunkirchen{"\n"}
      </Text>
      <Text style={styles.bold}>
        Online-Streitbeilegung:
      </Text>
      <Text>
      Die Europäische Kommission stellt unter http://ec.europa.eu/consumers/odr eine Plattform zur außergerichtlichen Online-Streitbeilegung bereit.
      {"\n"}
      </Text>
      <Text style={styles.bold}>
        Verbraucherstreitbeilegungsgesetz:
      </Text>
     <Text>
        An Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle müssen und wollen wir nicht teilnehmen. Grundsätzlich weisen wir darauf hin, dass NoArts! nichts an Streitigkeiten mit seinen Kunden liegt.
        {"\n"}
      </Text>
      <Text style={styles.bold}>
        Haftungshinweis:
      </Text>
      <Text>
        Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
        {"\n"}
      </Text>
      <Text style={styles.bold}>
       Ansprechpartner Internet-Inhalte der NoArts! App:
      </Text>
      <Text>
        Ralf Nonnweiler{"\n"}
        info@noarts.de{"\n"}
      </Text>
      <Text style={styles.bold}>
        Ansprechpartner Internet-Technik und -Administration:
      </Text>
      <Text>
        Harald Hartmann{"\n"}
        harald@hartmann-dev.net{"\n"}
      </Text>
      <Text style={styles.bold}>
        NoArts! App: Gestaltung und Realisation   
      </Text>
      <Text>
        Harald Hartmann{"\n"}
        harald@hartmann-dev.net{"\n"}
      </Text>
      <Text style={styles.bold}>
       Haftung
      </Text>
      <Text style={styles.bold}>
      1. Inhalt des Onlineangebotes
      </Text>
      <Text>
      "NoArts", im folgenden Autor, übernimmt keinerlei Gewähr für die Aktualität, Korrektheit, Vollständigkeit oder Qualität der bereitgestellten Informationen. Haftungsansprüche gegen den Autor, welche sich auf Schäden materieller oder ideeller Art beziehen, die durch die Nutzung oder Nichtnutzung der dargebotenen Informationen bzw. durch die Nutzung fehlerhafter und unvollständiger Informationen verursacht wurden, sind grundsätzlich ausgeschlossen, sofern seitens des Autors kein nachweislich vorsätzliches oder grob fahrlässiges Verschulden vorliegt. Alle Angebote sind freibleibend und unverbindlich. Der Autor behält es sich ausdrücklich vor, Teile der Seiten oder das gesamte Angebot ohne gesonderte Ankündigung zu verändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen.
      {"\n"}
      </Text>
      <Text style={styles.bold}>
      2. Verweise und Links
      </Text>
      <Text>
      Bei direkten oder indirekten Verweisen auf fremde Webseiten ("Hyperlinks"), die außerhalb des Verantwortungsbereiches des Autors liegen, würde eine Haftungsverpflichtung ausschließlich in dem Fall in Kraft treten, in dem der Autor von den Inhalten Kenntnis hat und es ihm technisch möglich und zumutbar wäre, die Nutzung im Falle rechtswidriger Inhalte zu verhindern. Der Autor erklärt hiermit ausdrücklich, dass zum Zeitpunkt der Linksetzung keine illegalen Inhalte auf den zu verlinkenden Seiten erkennbar waren. Auf die aktuelle und zukünftige Gestaltung, die Inhalte oder die Urheberschaft der gelinkten/verknüpften Seiten hat der Autor keinerlei Einfluss. Deshalb distanziert er sich hiermit ausdrücklich von allen Inhalten aller gelinkten /verknüpften Seiten, die nach der Linksetzung verändert wurden. Diese Feststellung gilt für alle innerhalb des eigenen Internetangebotes gesetzten Links und Verweise sowie für Fremdeinträge in vom Autor eingerichteten Gästebüchern, Diskussionsforen und Mailinglisten. Für illegale, fehlerhafte oder unvollständige Inhalte und insbesondere für Schäden, die aus der Nutzung oder Nichtnutzung solcherart dargebotener Informationen entstehen, haftet allein der Anbieter der Seite, auf welche verwiesen wurde, nicht derjenige, der über Links auf die jeweilige Veröffentlichung lediglich verweist.
      {"\n"}
      </Text>
      <Text style={styles.bold}>
      3. Urheber- und Kennzeichenrecht
      </Text>
      <Text>
      Der Autor ist bestrebt, in allen Publikationen die Urheberrechte der verwendeten Grafiken, Tondokumente, Videosequenzen und Texte zu beachten, von ihm selbst erstellte Grafiken, Tondokumente, Videosequenzen und Texte zu nutzen oder auf lizenzfreie Grafiken, Tondokumente, Videosequenzen und Texte zurückzugreifen. Alle innerhalb des Internetangebotes genannten und ggf. durch Dritte geschützten Marken- und Warenzeichen unterliegen uneingeschränkt den Bestimmungen des jeweils gültigen Kennzeichenrechts und den Besitzrechten der jeweiligen eingetragenen Eigentümer. Allein aufgrund der bloßen Nennung ist nicht der Schluss zu ziehen, dass Markenzeichen nicht durch Rechte Dritter geschützt sind! Das Copyright für veröffentlichte, vom Autor selbst erstellte Objekte bleibt allein beim Autor der Seiten. Eine Vervielfältigung oder Verwendung solcher Grafiken, Tondokumente, Videosequenzen und Texte in anderen elektronischen oder gedruckten Publikationen ist ohne ausdrückliche Zustimmung des Autors nicht gestattet.     
      {"\n"}
     </Text>
     <Text style={styles.bold}>
     4. Rechtswirksamkeit dieses Haftungsausschlusses
      </Text>
      <Text>
      Dieser Haftungsausschluss ist als Teil des Internetangebotes zu betrachten, von dem aus auf diese Seite verwiesen wurde. Sofern Teile oder einzelne Formulierungen dieses Textes der geltenden Rechtslage nicht, nicht mehr oder nicht vollständig entsprechen sollten, bleiben die übrigen Teile des Dokumentes in ihrem Inhalt und ihrer Gültigkeit davon unberührt.
      {"\n"}
     </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  notice: {
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

export default LegalNoticeScreen;
