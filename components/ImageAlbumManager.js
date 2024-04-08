import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImageAlbumManager() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    pickImage();
  }, []); // The empty array means this effect runs once after the initial render

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Optionally, you can handle what happens if the user cancels the selection
  // by adding logic after checking `result.canceled`

  return (
    <View style={styles.container}>
      {image ? <Image source={{ uri: image }} style={styles.image} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
});
