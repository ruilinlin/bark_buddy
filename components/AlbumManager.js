import { View, StyleSheet, Pressable, Image, Alert } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export default function AlbumManager({ imageURI, setImageURI }) {
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  // const [imageUri, setImageUri] = useState(null); // Initialize as null
  // console.log(imageURI);

  async function verifyPermission() {
    if (status.granted) {
      return true;
    }
    try {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    } catch (err) {
      console.log(err);
    }
  }

  async function pickImageHandler() {
    try {
      const havePermission = await verifyPermission();
      if (!havePermission) {
        Alert.alert("You need to give permission");
        return;
      }

      const results = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      // console.log(results.uri);

      if (!results.cancelled) {
        setImageURI(results.uri);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={pickImageHandler}>
        <Image
          source={
            imageURI ? { uri: imageURI } : require("../assets/dog-lover.png")
          }
          style={styles.avatorContainer}
          resizeMode="cover"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  avatorContainer: {
    width: 100,
    height: 100,
  },
  image: {
    width: 100,
    height: 100,
  },
});
