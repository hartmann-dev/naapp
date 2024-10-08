import React, { useState } from 'react';
import { ImageBackground, View, Pressable, StyleSheet, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { manipulateAsync } from 'expo-image-manipulator';

import Colors from '../../constants/Colors';
import Calc from '../../utils/calc';
import { getLocale } from '../../utils/locale';

const placeholderImg = require('../../assets/bg/card.jpg');
const MAX_BYTE__SIZ = 4 * 1024 * 1024;
const size = Calc.cardSize('home');
const ImageInput = ({ setFile }) => {
  const [image, setImage] = useState(null);

  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      base64: true,
      quality: 1,
    });

    if (!_image.cancelled) {
      const info = await FileSystem.getInfoAsync(_image.uri, { size: true });
      if (info.size < MAX_BYTE__SIZ) {
        setImage(_image.uri);
        setFile(_image);
      } else {
        const reduce = Math.ceil(info.size / MAX_BYTE__SIZ);
        const newHeight = Math.round(_image.height / reduce);
        const newWidth = Math.round(_image.width / reduce);
        const image = await manipulateAsync(_image.uri, [{ resize: { height: newHeight, width: newWidth } }], {
          base64: true,
        });
        setImage(image.uri);
        setFile(image);
        const tmpo = await FileSystem.getInfoAsync(image.uri, { size: true });
      }
    }
  };

  const deleteImage = () => {
    setImage(null);
    setFile(null);
  };
  /*
  if (!image) {
    return (
      <Pressable style={[styles.button, styles.addButton]} onPress={addImage}>
        <FontAwesome5 name="image" size={26} color="white" />
        <Text style={styles.text}>Bild auswählen</Text>
      </Pressable>
    );
  }

  return image ? (
    <View style={styles.container}>
      <ImageBackground source={{ uri: image }} style={styles.image}>
        <Pressable style={[styles.button, styles.delButton]} onPress={deleteImage}>
          <FontAwesome5 name="trash-alt" size={26} color="white" />
          <Text style={styles.text}>Bild löschen</Text>
        </Pressable>
      </ImageBackground>
    </View>
  ) : null;

*/
  return (
    <View style={styles.imageItem}>
      <Pressable style={{ flex: 1 }} onPress={image ? deleteImage : addImage}>
        <View style={styles.imageCard}>
          <ImageBackground
            style={styles.image}
            source={image ? { uri: image } : placeholderImg}
            imageStyle={{
              height: size.height, // the image height
            }}
          >
            <Text style={styles.imageButton}>
              {image ? (
                <>
                  <FontAwesome5 name='trash-alt' size={18} color='white' style={{ marginRight: 10 }} />
                  <Text style={styles.imageText}>{getLocale() == 'en' ? ' delete image' : ' Bild löschen'}</Text>
                </>
              ) : (
                <>
                  <FontAwesome5 name='image' size={18} color='white' style={{ paddingRight: 10 }} />
                  <Text style={styles.imageText}>{getLocale() == 'en' ? ' add image' : ' Bild hinzufügen'}</Text>
                </>
              )}
            </Text>
          </ImageBackground>
        </View>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  imageItem: {
    marginTop: size.margin,
    height: size.height + 10,
    width: size.width + 10,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  image: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    overflow: 'hidden', // prevent image overflow the container
  },
  imageButton: {
    padding: 5,
    backgroundColor: Colors.primary,
    alignItems: 'flex-start',
  },
  imageText: {
    fontFamily: 'alien',
    color: Colors.accent,
    fontSize: 16,
    lineHeight: 18,
    textShadowColor: 'rgba(0, 0, 0, 0.95)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  imageCard: {
    flex: 1,
  },
});

export default ImageInput;
