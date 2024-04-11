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
    <ScrollView contentContainerStyle={styles.Container}>
      {images.map((img) => (
        <Image key={img.uri} source={{ uri: img.uri }} style={styles.image} resizeMode="cover" />
      ))}

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
        <Text style={styles.Text}>Filter</Text>
        </Pressable>
      </View>
      {/* <FloatingWindow navigation={navigation} /> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap', //  show images in a grid
  },
  image: {
    width: 400,
    height: 450,
    // marginVertical: 10,
  },
  Container: { 
    flex: 1,
    backgroundColor: colors.lightbackgroundlight,
  },
  nextButtonContainer:{
    // marginTop:30,
    alignItems:"flex-end",
  },
  nextButton:{
    backgroundColor:"rgba( 136, 116, 163, 0.5)",
    flexDirection:"row-reverse",
    width:90,
    height:40,
    borderRadius:10,
    alignItems:"center",
    margin:10,
  },
  Text:{
    color:colors.lightbackgroundlight,
    fontSize:14,
  }
});
