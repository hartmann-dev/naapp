import React, { useState } from "react";
import { Text, View, TextInput, Switch, Pressable, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import Toast from "react-native-root-toast";

import { postAppointment } from "../../services/appointment";

import ImageInput from "./ImageInput";
import Colors from "../../constants/Colors";

const Form = ({ navigation }) => {
  const formFields = [
    {
      id: "name",
      type: "input",
      value: null,
      label: "Name",
      rules: {
        required: { value: true, message: "Name darf nicht leer sein" },
      },
    },
    {
      id: "birthday",
      type: "input",
      value: null,
      label: "Gebutsdatum",
      rules: {
        required: { value: true, message: "Gebutsdatum darf nicht leer sein" },
      },
    },
    {
      id: "street",
      type: "input",
      value: null,
      label: "Straße / Nr.",
      rules: {
        required: { value: true, message: "Straße / Nr. darf nicht leer sein" },
      },
    },
    {
      id: "city",
      type: "input",
      value: null,
      label: "PLZ / Ort",
      rules: {
        required: { value: true, message: "PLZ / Ort darf nicht leer sein" },
      },
    },
    {
      id: "phone",
      type: "input",
      value: null,
      label: "Telefon",
      rules: {
        required: { value: true, message: "Telefon darf nicht leer sein" },
      },
    },
    {
      id: "email",
      type: "input",
      value: null,
      label: "E-Mail Adresse",
      rules: {
        required: { value: true, message: "E-Mail Adresse darf nicht leer sein" },
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "E-Mail Adresse ist nicht gültig",
        },
      },
    },
    {
      id: "bodypart",
      type: "input",
      value: null,
      label: "Körperstelle",
      rules: {
        required: { value: true, message: "Körperstelle darf nicht leer sein" },
      },
    },
    {
      id: "comment",
      type: "input",
      multiline: true,
      value: null,
      label: "Anmerkungen",
      rules: {
        required: false,
      },
    },
  ];
  const [buttonText, setButtonText] = useState("absenden");
  const [gesendet, setGesendet] = useState(false);
  const [sendet, setSendet] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (fData) => {
    const data = new FormData();

    if (img1 != null) {
      let { base64 } = img1;
      fData["image1_base64"] = base64;
      // Erstmal wird das Bild per base64 gesendet.
      /*
      let nameParts = uri.split(".");
      let fileType = nameParts[nameParts.length - 1];
      data.append("files.image1", {
        name: "Image 1",
        uri: uri,
        type: "application/" + fileType,
      });
      */
    }

    if (img2 != null) {
      let { base64 } = img2;
      fData["image2_base64"] = base64;
      // Erstmal wird das Bild per base64 gesendet.
      /*
      let nameParts = uri.split(".");
      let fileType = nameParts[nameParts.length - 1];
      data.append("files.image2", {
        name: "Image 2",
        uri: uri,
        type: "application/" + fileType,
      });
      */
    }
    if (img3 != null) {
      let { base64 } = img3;
      fData["image3_base64"] = base64;
      // Erstmal wird das Bild per base64 gesendet.
      /*
      let nameParts = uri.split(".");
      let fileType = nameParts[nameParts.length - 1];
      data.append("files.image3", {
        name: "Image 3",
        uri: uri,
        type: "application/" + fileType,
      });
      */
    }

    if (img4 != null) {
      let { base64 } = img4;
      fData["image4_base64"] = base64;
      // Erstmal wird das Bild per base64 gesendet.
      /*
      let nameParts = uri.split(".");
      let fileType = nameParts[nameParts.length - 1];
      data.append("files.image4", {
        name: "Image 4",
        uri: uri,
        type: "application/" + fileType,
      });
      */
    }
    data.append("data", JSON.stringify(fData));
    setSendet(true);
    postAppointment(data)
      .then(function () {
        let toast = Toast.show("Anfrage erfolgreich versendet", {
          duration: Toast.durations.LONG,
          position: 100,
          backgroundColor: Colors.primary,
          textColor: "#fff",
          opacity: 1,
        });
        setButtonText("erfolgreich vesendet");
        setGesendet(true);
        setSendet(false);
      })
      .catch(function (e) {
        let toast = Toast.show("Ein Fehler ist aufgetreten.\nBitte versuche es später noch einmal.", {
          duration: Toast.durations.LONG,
          position: 100,
          backgroundColor: "#ff0000",
          textColor: "#fff",
          opacity: 1,
        });
        setSendet(false);
      });

    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     console.log(data);
    //     resolve();
    //   }, 2000);
    // });
  };
  const onError = (errors, e) => {
    // TODO soll hochscorllen nach einem Fehler
    //scrollToTop();
    let errorMsg = "Anfrage konnte nicht gesendet werden:";
    for (let error in errors) {
      errorMsg += `\n\n${errors[error].message}`;
    }
    let toast = Toast.show(errorMsg, {
      duration: Toast.durations.LONG,
      position: 100,
      backgroundColor: "#ff0000",
      textColor: "#fff",
      opacity: 1,
    });
  };

  const [img1, setImg1] = useState();
  const [img2, setImg2] = useState();
  const [img3, setImg3] = useState();
  const [img4, setImg4] = useState();

  if (gesendet)
    return (
      <View>
        <Text style={styles.thx}>Vielen Dank für deine Terminanfrage.</Text>
        <Text>
          Wir melden uns nach der nächsten Terminvergabe bei dir um den Termin zu bestätigen und/oder weitere Fragen zu
          klären.
        </Text>
        <Text></Text>
        <Text>Infos zur Terminanfrage:</Text>
        <Text></Text>

        <Text>- Wegen der großen Nachfrage können wir momentan keine Wunschtermine berücksichtigen </Text>
        <Text>- Anfragen kann jeder, der am Termin das 18. Lebensjahr vollendet hat</Text>
        <Text>- Ohne eine Anzahlung kann bei uns leider kein Termin reserviert werden</Text>
        <Text>- Die Bearbeitungszeit der angefragten Termine dauert in der Regel wenige Wochen</Text>
        <Text>
          - Bei Terminanfragen für Ralf ist zu beachten, dass nur Black and Grey Tätowierungen angefragt werden können -
          Bestimmte Motive (Uhren, Federn, Kompass ... usw.) fallen nicht in den Bereich von Ralf. Bitte habt
          Verständnis dafür, falls euer Motiv abgelehnt wird.
        </Text>
        <Text>- Es werden nur korrekt ausgefüllte Formulare berücksichtigt. </Text>
        <Text>- Das Ausfüllen und Abschicken des Formulars bedeutet keine Termingarantie. </Text>
        <Text>
          - Sollten wir uns nicht innerhalb von wenigen Wochen bei Euch gemeldet haben, dann nicht enttäuscht sein und
          es einfach beim nächsten Mal nochmals probieren.
        </Text>
      </View>
    );

  return (
    <View>
      {formFields.map((field) => {
        return (
          <Controller
            key={field.id}
            control={control}
            rules={field.rules}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Text style={styles.label}>
                  {field.label}
                  {field.rules.required.value == true && <Text style={styles.error}>*</Text>}
                </Text>
                {errors[field.id] && <Text style={styles.error}>{errors[field.id].message}</Text>}
                {field.multiline ? (
                  <TextInput
                    style={[styles.textarea, styles.input]}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    multiline
                  />
                ) : (
                  <TextInput style={styles.input} onBlur={onBlur} onChangeText={onChange} value={value} />
                )}
              </>
            )}
            name={field.id}
          />
        );
      })}
      <View style={styles.imageContainer}>
        <ImageInput setFile={setImg1} />
        <ImageInput setFile={setImg2} />
        <ImageInput setFile={setImg3} />
        <ImageInput setFile={setImg4} />
      </View>
      <Controller
        control={control}
        rules={{
          required: { value: true, message: "Datenschutzbestimmungen müssen gelesen und akzeptiert werden" },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.switchContainer}>
            <Switch
              trackColor={{ false: Colors.accent, true: Colors.accent }}
              thumbColor={value ? Colors.primary : "#999"}
              ios_backgroundColor={Colors.accent}
              onValueChange={onChange}
              value={value}
            />
            <Text style={styles.label}>
              Ich habe die{" "}
              <Text
                style={styles.link}
                onPress={() => {
                  navigation.push("Article", {
                    title: "Datenschutz",
                    type: "Single",
                    dispatcher: "getArticles",
                    slug: "de-single-privacy",
                  });
                }}
              >
                Datenschutzbestimmungen
              </Text>{" "}
              gelesen und akzeptiert.
              <Text style={styles.error}>*</Text>
            </Text>
            {errors["datenschutz"] && <Text style={styles.error}>Datenschutzbestimmungen muss akzeptiert werden</Text>}
          </View>
        )}
        name="datenschutz"
      />
      {sendet ? (
        <Pressable style={styles.buttonDisabled}>
          <Text style={styles.buttontext}>sendet...</Text>
        </Pressable>
      ) : (
        <Pressable style={styles.button} onPress={handleSubmit(onSubmit, onError)}>
          <Text style={styles.buttontext}>{buttonText}</Text>
        </Pressable>
      )}
      <Text style={[styles.label]}>* = Pflichtfeld</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    padding: 5,
    marginTop: 2,
    marginBottom: 15,
    fontSize: 15,
    lineHeight: 20,
  },
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  switchContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",

    marginBottom: 20,
    alignItems: "center",
  },
  textarea: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  label: {
    color: Colors.primary,
    fontSize: 15,
    lineHeight: 17,
    maxWidth: "85%",
  },
  error: {
    color: "#ff0000",
    fontSize: 13,
    lineHeight: 14,
    maxWidth: "85%",
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 10,
  },
  buttonDisabled: {
    backgroundColor: "#666",
    padding: 10,
  },
  buttontext: {
    fontFamily: "alien",
    color: Colors.accent,
    fontSize: 20,
    lineHeight: 22,
    textShadowColor: "rgba(0, 0, 0, 0.95)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    textAlign: "center",
  },
  thx: {
    fontFamily: "alien",
    fontSize: 20,
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 10,
  },
  link: {
    textDecorationLine: "underline",
  },
});

export default Form;
