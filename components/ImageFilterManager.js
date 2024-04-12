import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, StyleSheet, Pressable ,Text, Animated } from 'react-native';
import { colors } from '../helper/Color';
import FloatingWindow from "./FloatingWindow";
import NextButton from './NextButton';
import FilterGallery from './FilterGallery';
// import ImageViewer from './PostImageViewer';
// import { Feather } from '@expo/vector-icons';
// import LottieView from 'lottie-react-native';

export default function ImageFilterManager({ navigation, route }) {
  const [images, setImages] = useState([])
  
  // Log to debug
  console.log(route.params);
// use to show gallery
  const Filters = [{id: '1', uri: require('../assets/bomei_1.png') ,name:"Colosseum"},
                  {id: '2', uri: require('../assets/bomei_2.png') ,name:"Colosseum"},
                  {id: '3', uri: require('../assets/bomei_3.png') ,name:"Colosseum"},
                  {id: '4', uri: require('../assets/jinmao_1.png') ,name:"Colosseum"},
                  {id: '5', uri: require('../assets/jinmao_2.png') ,name:"Colosseum"},
                  {id: '6', uri: require('../assets/jinmao_3.png') ,name:"Colosseum"},
                ]

  useEffect(() => {
    if (route.params?.images) {
      setImages(route.params.images);
    }
  }, [route.params?.images]);

  function handleNext(){
    navigation.navigate('Text', { images: images });
  }

  const handleSelectFilter = (filterId) => {
    console.log("Selected filter:", filterId);
  };

  return (
    <ScrollView contentContainerStyle={styles.Container}>
      {images.map((img) => (
        <Image key={img.uri} source={{ uri: img.uri }} style={styles.image} resizeMode="cover" />
      ))}

      <NextButton handleNext={handleNext} style={styles.nextButtonContainer} text="Text" />
     
      <View style={styles.floatingContainer}>
        <FloatingWindow navigation={navigation} />
      </View>

      <View style={styles.FilterContainer}>
        <FilterGallery filters={Filters} onSelectFilter={handleSelectFilter} />
      </View> 
  
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    flexWrap: 'wrap', //  show images in a grid
    flex: 1,
    backgroundColor: colors.lightbackgroundlight,
  },
  nextButtonContainer:{
    // marginTop:30,
    alignItems:"flex-end",
  },
  image: {
    width: 400,
    height: 400,
    // marginVertical: 10,
  },
  FilterContainer:{
    marginTop:30,
    // width: 200,
    // height: 200,
    borderColor:colors.backgroundshallow,
    backgroundColor:colors.lightbackgroundlight,
  },
  floatingContainer: {
    position: 'absolute',
    bottom: 20,  
    right: 10,   
    padding: 10,
    // Add z-index if needed to ensure it's above all other content
    zIndex: 10,
  },
});