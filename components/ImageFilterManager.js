import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, StyleSheet, Pressable ,Text, Animated } from 'react-native';
import { colors } from '../helper/Color';
import FloatingWindow from "./FloatingWindow";
// import { Feather } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

export default function ImageFilterManager({ navigation, route }) {
  const [images, setImages] = useState([])
  // Log to debug
  console.log(route.params);

  useEffect(() => {
    if (route.params?.images) {
      setImages(route.params.images);
    }
  }, [route.params?.images]);

  function handleNext(){
    navigation.navigate('Text', { images: images });
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
        <Text style={styles.Text}>Next</Text>
        </Pressable>
      </View>
      <FloatingWindow navigation={navigation} />
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
