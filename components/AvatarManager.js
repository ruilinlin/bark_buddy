import { View, StyleSheet, Pressable, Image, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { colors } from "../helper/Color";
import { auth, database, storage } from "../firebase-files/firebaseSetup";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AvatarManager({ receiveImageURI, savedImage }) {
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [imageUri, setImageUri] = useState(null); // Initialize as null

  // console.log("it is imageUri", imageUri);
  // console.log("it is savedImage", savedImage);

  useEffect(() => {
    if (savedImage) {
      setImageUri(savedImage);
    }
  }, [savedImage]);

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

  async function uploadImage(uri) {
    try {
      // console.log(uri);
      const response = await fetch(uri);
      const imageBlob = await response.blob();
      // console.log(imageBlob.size);

      const imageName = uri.substring(uri.lastIndexOf("/") + 1);
      const imageRef = ref(storage, `images/${imageName}`);
      const uploadResult = await uploadBytes(imageRef, imageBlob);
      const downloadURL = await getDownloadURL(uploadResult.ref);
      return downloadURL;
    } catch (err) {
      console.log("test error information", err);
    }
  }

  async function pickImageHandler() {
    try {
      const havePermission = await verifyPermission();
      if (!havePermission) {
        Alert.alert(
          "Upload avatar needs access to your Album, please give us permission"
        );
        return;
      }

      const results = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0,
      });

      if (!results.canceled && results.assets && results.assets.length > 0) {
        const selectedImageUri = results.assets[0].uri;
        const downloadURL = await uploadImage(selectedImageUri);
        // console.log("Download URL:", downloadURL);

        // Set the state to the download URL
        receiveImageURI(downloadURL);
        setImageUri(downloadURL);
      }
    } catch (err) {
      console.log("Error:", err);
    }
  }

  // async function pickImageHandler() {
  //   try {
  //     const havePermission = await verifyPermission();
  //     if (!havePermission) {
  //       Alert.alert(
  //         "upload avatar needs access to your Album,please give us permission"
  //       );
  //       return;
  //     }

  //     const results = await ImagePicker.launchImageLibraryAsync({
  //       allowsEditing: true,
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       quality: 0,
  //     });

  //     // console.log(results.uri);
  //     if (!results.canceled && results.assets && results.assets.length > 0) {
  //       const selectedImageUri = results.assets[0].uri; // Access the correct property
  //       receiveImageURI(results.assets[0].uri);
  //       setImageUri(selectedImageUri);
  //       uploadImage(selectedImageUri);
  //       console.log(selectedImageUri);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

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
    borderColor: colors.backgroundlight,
    borderWidth: 3,
    // borderLeftColor:colors.backgrounddark,
  },
  image: {
    width: 100,
    height: 100,
  },
});
