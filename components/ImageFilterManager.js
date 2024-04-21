import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, StyleSheet, Pressable ,Text, Animated } from 'react-native';
import { colors } from '../helper/Color';
import FloatingWindow from "./FloatingWindow";
import FilterGallery from './FilterGallery';
import LottieView from 'lottie-react-native';
import NextButton from './NextButton';
import ImageViewer from './PostImageViewer';


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
    // else(){
    //   console.log("ask permission again");
    // }
  }, [route.params?.images]);

  function handleNext(){
    navigation.navigate('Text', { images: images });
  }

  const handleSelectFilter = (filterId) => {
    console.log("Selected filter:", filterId);
  };

  function handleBack(){
    navigation.navigate('Album');
  }

  return (
    <ScrollView contentContainerStyle={styles.Container}>
      <View style={styles.contentContainer}>
      <ImageViewer images={images}/>
      </View>
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

    {/* </View>
      <View style={styles.floatingContainer}>
        <FloatingWindow navigation={navigation} />
      </View> */}
      <Text style={styles.text}>FilterGallery</Text>
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
  contentContainer:{
    flex:3,
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
    marginBottom:20,
    flex:2,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: "space-around",
    // alignItems: 'center',
    marginHorizontal: 10, 
    flex:1,
  },
  nextButton: {
    backgroundColor: "rgba(136, 116, 163, 0.5)",
    flexDirection: 'row-reverse',
    width: 90,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginRight:170,
  },
  text: {
    // color: colors.backgroundlight,
    fontSize: 14,
  },
  backButton: {
    backgroundColor: "rgba(136, 116, 163, 0.5)",
    flexDirection: 'row-reverse',
    width: 90,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
  },
});
