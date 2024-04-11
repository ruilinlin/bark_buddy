import React, { useState, useEffect } from 'react';
import { Image, ScrollView, View, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import FloatingWindow from "./FloatingWindow";
import { colors } from '../helper/Color';
import ImageViewer from './PostImageViewer';

export default function ImageAlbumManager({ navigation }) {
  const [images, setImages] = useState([]);


  useEffect(() => {
    pickImage();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [5, 3],
      quality: 1,
      selectionLimit: 0,  // Allows multiple selections
    });

    console.log(result);

    if (!result.canceled && result.assets) {
      const imgData = result.assets.map(asset => ({
        uri: asset.uri 
      }));
      setImages(imgData);
      navigation.navigate('Filter', { images: imgData });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {images.length > 0 && <ImageViewer images={images} />}
      <FloatingWindow navigation={navigation} />
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    flex: 1,
    backgroundColor: colors.lightbackgroundlight,
    // alignItems: "center",
    // justifyContent: "center",
    paddingBottom: 20,
  },
  image: {
    width: 400,
    height: 800,
    marginVertical: 10,
  },
});
