import { StyleSheet, Text, View, ScrollView, Image, KeyboardAvoidingView, Platform , Pressable, Animated } from 'react-native';
import React, { useState, useEffect } from 'react';
import { colors } from '../helper/Color';
import FloatingWindow from "./FloatingWindow";
import Input from './Input';
import NextButton from './NextButton';
import { auth, database, storage } from "../firebase-files/firebaseSetup";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { writeToDB } from "../firebase-files/firestoreHelper";
import LottieView from 'lottie-react-native';
export default function TextManager({ navigation, route }) {
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    if (route.params?.images) {
      setImages(route.params.images.map(img => img.uri)); 
    }
  }, [route.params?.images]);

  // Upload image to Firebase Storage and return the URL
  async function uploadImage(uri) {
    try {
      console.log(uri);
      const response = await fetch(uri);
      const imageBlob = await response.blob();
      console.log(imageBlob.size);

      const imageName = uri.substring(uri.lastIndexOf("/") + 1);
      const imageRef = ref(storage, `images/${imageName}`);
      const uploadResult = await uploadBytes(imageRef, imageBlob);
      const downloadURL = await getDownloadURL(uploadResult.ref);
      return downloadURL;
    } catch (err) {
      console.log("test error information" ,err);
    }
  }

  // Add a new post to Firestore with image URLs
  const addNewPost = async () => {
    try {
      const imageUrls = await Promise.all(images.map(imgUri => uploadImage(imgUri)));
      const newPost = {
        userId: auth.currentUser.uid,
        images: imageUrls,
        description: description,
        tags: selectedTags,
        likeNumbers: 0,
        commentNumbers: 0,
        createdAt: new Date()
      };

      const docRef = await writeToDB(newPost, "Posts");
      console.log("New post added with ID:", docRef);
      // navigation.navigate('screen'); 
    } catch (error) {
      console.error("Failed to add new post:", error);
      alert("Failed to post. Please try again.");
    }
  };

  const handlePost = () => {
    if (!description || images.length === 0) {
      alert("Please add a description and at least one image.");
      return;
    }
    addNewPost();
    navigation.navigate('Posts');
  };

  function handleBack(){
    navigation.navigate('Filter');
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {images.map((img, index) => (
          <Image key={index} source={{ uri: img }} style={styles.image} resizeMode="cover" />
        ))}
        {/* <FloatingWindow navigation={navigation} /> */}
        <Input
          label="Description"
          value={description}
          onChangeText={setDescription}
          placeholder="Add Your Thoughts Here..."
          multiline={true}
          numberOfLines={4}
          custominputborder={{ borderWidth: 0 }}
          Customstyle={{ fontSize: 20 }}
        />
      <View style={styles.buttonContainer}>

      <Pressable onPress={handleBack} style={styles.backButton}>
          <Animated.View>
            <LottieView
              source={require('../assets/animate/nextarrow.json')} 
              autoPlay
              loop
              style={{ width: 40, height: 40 }}
            />
          </Animated.View>
          <Text style={styles.text}>Back</Text>
        </Pressable>

        <Pressable onPress={handlePost} style={styles.nextButton}>
          <Animated.View>
            <LottieView
              source={require('../assets/animate/nextarrow.json')}
              autoPlay
              loop
              style={{ width: 40, height: 40 }}
            />
          </Animated.View>
          <Text style={styles.text}>Post</Text>
        </Pressable>

      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightbackgroundlight,
    // padding: 10
  },
  image: {
    width: 400,
    height: 400,
    marginBottom: 10
  },
  nextButton: {
    backgroundColor: "rgba(136, 116, 163, 0.5)",
    flexDirection: 'row-reverse',
    width: 90,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    margin: 30,
    marginRight:270,
    // marginTop:600,
  },
  text: {
    // color: colors.backgroundlight,
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: "space-around",
    // alignItems: 'center',
    marginHorizontal: 10, 
  },

  backButton: {
    backgroundColor: "rgba(136, 116, 163, 0.5)",
    flexDirection: 'row-reverse',
    width: 90,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    margin: 30,
  },
});
