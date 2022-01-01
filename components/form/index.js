import React, { useState } from "react";
import { Text, View, TextInput, Switch, Pressable, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";

import { postAppointment } from "../../services/appointment";

import ImageInput from "./ImageInput";
import Colors from "../../constants/Colors";

const Form = ({ scrollToTop }) => {
  const formFields = [
    {
      id: "name",
      type: "input",
      value: null,
      label: "Name",
      rules: {
        required: true,
      },
    },
    {
      id: "birthday",
      type: "input",
      value: null,
      label: "Gebutsdatum",
      rules: {
        required: true,
      },
    },
    {
      id: "street",
      type: "input",
      value: null,
      label: "Straße / Nr.",
      rules: {
        required: true,
      },
    },
    {
      id: "city",
      type: "input",
      value: null,
      label: "PLZ / Ort",
      rules: {
        required: true,
      },
    },
    {
      id: "phone",
      type: "input",
      value: null,
      label: "Telefon",
      rules: {
        required: true,
      },
    },
    {
      id: "email",
      type: "input",
      value: null,
      label: "E-Mail Adresse",
      rules: {
        required: true,
      },
    },
    {
      id: "bodypart",
      type: "input",
      value: null,
      label: "Körperstelle",
      rules: {
        required: true,
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

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();
  const onSubmit = (fData) => {
    const data = new FormData();

    data.append("data", JSON.stringify(fData));
    if (img1 != null) {
      let { uri } = img1;
      let nameParts = uri.split(".");
      let fileType = nameParts[nameParts.length - 1];
      data.append("files.image1", {
        name: "Image 1",
        uri: uri,
        type: "application/" + fileType,
      });
    }

    if (img2 != null) {
      let { uri } = img2;
      let nameParts = uri.split(".");
      let fileType = nameParts[nameParts.length - 1];
      data.append("files.image2", {
        name: "Image 2",
        uri: uri,
        type: "application/" + fileType,
      });
    }
    if (img3 != null) {
      let { uri } = img3;
      let nameParts = uri.split(".");
      let fileType = nameParts[nameParts.length - 1];
      data.append("files.image3", {
        name: "Image 3",
        uri: uri,
        type: "application/" + fileType,
      });
    }

    if (img4 != null) {
      console.log(img1);
      let { uri } = img4;
      let nameParts = uri.split(".");
      let fileType = nameParts[nameParts.length - 1];
      data.append("files.image4", {
        name: "Image 4",
        uri: uri,
        type: "application/" + fileType,
      });
    }

    postAppointment(data);
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     console.log(data);
    //     resolve();
    //   }, 2000);
    // });
  };
  const onError = (errors, e) => {
    //console.log(errors, e);
    // TODO soll hochscorllen nach einem Fehler
    //scrollToTop();
  };

  const [img1, setImg1] = useState();
  const [img2, setImg2] = useState();
  const [img3, setImg3] = useState();
  const [img4, setImg4] = useState();

  let buttonText = "absenden";
  if (isSubmitting) {
    buttonText = "sendet ...";
  }
  if (isSubmitSuccessful) {
    buttonText = "erfolgreich vesendet";
  }

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
                  {field.rules.required == true && <Text style={styles.error}>*</Text>}
                </Text>
                {errors[field.id] && <Text style={styles.error}>darf nicht leer sein</Text>}
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
          required: true,
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
              Ich habe die Datenschutzbestimmungen gelesen und akzeptiert.<Text style={styles.error}>*</Text>
            </Text>
            {errors["datenschutz"] && <Text style={styles.error}>Datenschutzbestimmungen muss akzeptiert werden</Text>}
          </View>
        )}
        name="datenschutz"
      />

      {isSubmitting || isSubmitSuccessful ? (
        <Pressable style={styles.buttonDisabled}>
          <Text style={styles.buttontext}>{buttonText}</Text>
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
});

export default Form;
