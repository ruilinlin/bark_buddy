import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, StyleSheet, Pressable ,Text, Animated } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import FloatingWindow from "./FloatingWindow";
import { colors } from '../helper/Color';
import ImageViewer from './PostImageViewer';
import LottieView from 'lottie-react-native';

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

  function handleNext(){
    navigation.navigate('Filter', { images: images });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {images.length > 0 && <ImageViewer images={images} />}
      <View style={styles.nextButtonContainer}>
        <Pressable onPress ={handleNext} style={styles.nextButton}>
        <Animated.View style={styles.nextButtonContainer}>
        <LottieView
          source={require('../assets/animate/nextarrow.json')}
          autoPlay
          loop
          style={{ width: 40, height: 40 }} 
         
        />
        </Animated.View>
        <Text style={styles.Text}>Next</Text>
        </Pressable>
      </View>
      {/* <FloatingWindow navigation={navigation} /> */}
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
