import { View, StyleSheet, Pressable, Image, Alert } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { colors } from '../helper/Color';

export default function AvatarManager({receiveImageURI}) {
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [imageUri, setImageUri] = useState(null); // Initialize as null
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
        Alert.alert("upload avatar needs access to your Album,please give us permission");
        return;
      }

      const results = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0,
      });

      // console.log(results.uri);
      if (!results.canceled && results.assets && results.assets.length > 0) {
        const selectedImageUri = results.assets[0].uri; // Access the correct property
        receiveImageURI(results.assets[0].uri);
        setImageUri(selectedImageUri);
        console.log(selectedImageUri);
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
            imageUri ? { uri: imageUri } : require("../assets/dog-lover.png")
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
    borderRadius: 50,
    // backgroundColor:colors.backgroundlight,
    borderColor:colors.backgroundlight,
    borderWidth:3,
    // borderLeftColor:colors.backgrounddark,
  },
  image: {
    width: 100,
    height: 100,
  },
});
