import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, StyleSheet, Pressable ,Text, Animated } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import FloatingWindow from "./FloatingWindow";
import { colors } from '../helper/Color';
import ImageViewer from './PostImageViewer';
import LottieView from 'lottie-react-native';
import NextButton from './NextButton';

export default function ImageAlbumManager({ navigation }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    pickImage();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3,5],
      quality: 0,
      selectionLimit: 0,  // Allows multiple selections
    });

    console.log(result);

    if (!result.canceled && result.assets) {
      const imgData = result.assets.map(asset => ({
        uri: asset.uri 
      }));
      setImages(imgData);
      // navigation.navigate('Filter', { images: imgData });
    }
  };

  function handleNext(){
    navigation.navigate('Filter', { images: images });
  }

  function handleBack(){
    navigation.navigate('Camera');
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {images.map((img) => (
        <Image key={img.uri} source={{ uri: img.uri }} style={styles.image} resizeMode="cover" />
      ))}
  
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
          <Text style={styles.text}>Take by Camera</Text>
        </Pressable>


        <Pressable onPress={handleNext} style={styles.nextButton}>
          <Animated.View>
            <LottieView
              source={require('../assets/animate/nextarrow.json')}
              autoPlay
              loop
              style={{ width: 40, height: 40 }}
            />
          </Animated.View>
          <Text style={styles.text}>Next</Text>
        </Pressable>
  

      </View>
    </ScrollView>
  );
} 
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap', // show images in a grid
      flex: 1,
      backgroundColor: colors.lightbackgroundlight,
    },
    image: {
      width: 400,
      height: 450,
      // marginVertical: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: "space-around",
      // alignItems: 'center',
      marginHorizontal: 10, 
    },
    nextButton: {
      backgroundColor: "rgba(136, 116, 163, 0.5)",
      flexDirection: 'row-reverse',
      width: 90,
      height: 40,
      borderRadius: 10,
      alignItems: 'center',
      margin: 30,
      marginRight:100,
    },
    text: {
      // color: colors.backgroundlight,
      fontSize: 14,
    },
    backButton: {
      backgroundColor: "rgba(136, 116, 163, 0.5)",
      flexDirection: 'row-reverse',
      width: 150,
      height: 40,
      borderRadius: 10,
      alignItems: 'center',
      margin: 30,
    },
  });
  