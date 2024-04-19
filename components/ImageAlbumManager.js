import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, StyleSheet, Pressable ,Text, Animated } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import FloatingWindow from "./FloatingWindow";
import { colors } from '../helper/Color';
import ImageViewer from './PostImageViewer';
import LottieView from 'lottie-react-native';
import NextButton from './NextButton';
import { MaterialIcons } from '@expo/vector-icons';

export default function ImageAlbumManager({ navigation }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    pickImage();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      presentationStyle: ImagePicker.UIImagePickerPresentationStyle.AUTOMATIC,
      UIImagePickerPresentationStyle:'formSheet',
      // allowsEditing: true,
      aspect: [3,5],
      quality: 0,
      selectionLimit: 0,
      allowsMultipleSelection: true, 
    });

    // console.log(result);

    if (!result.canceled && result.assets) {
      const imgData = result.assets.map(asset => ({
        uri: asset.uri 
      }));
      setImages([...images, ...imgData]);
      // navigation.navigate('Filter', { images: imgData });
    }
  };

  function handleNext(){
    navigation.navigate('Filter', { images: images });
  }

  function handleBack(){
    navigation.navigate('Camera');
  }

  function toggleDeletable(index) {
    const updatedImages = [...images];
    updatedImages[index].deletable = !updatedImages[index].deletable;
    setImages(updatedImages);
  }

  function deleteImage(index) {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <ImageViewer images={images} />
        <ScrollView horizontal showsHorizontalScrollIndicator={true} style={styles.thumbnailContainer}>
          {images.map((img, index) => (
            <Pressable key={index} onPress={() => toggleDeletable(index)}>
              <View style={styles.thumbnailWrapper}>
                <Image
                  source={{ uri: img.uri }}
                  style={styles.thumbnail}
                />
                {img.deletable && (
                  <Pressable onPress={() => deleteImage(index)} style={styles.deleteIcon}>
                    <MaterialIcons name="delete-forever" size={24} color="black" />
                  </Pressable>
                )}
              </View>
            </Pressable>
          ))}
          <Pressable onPress={pickImage} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add</Text>
          </Pressable>
        </ScrollView>
        {/* <ScrollView horizontal contentContainerStyle={styles.previewImagesContainer}>
          {images.map((img, index) => (
            <Pressable key={index} onPress={() => console.log('Preview image pressed', index)}>
              <Image
                source={{ uri: img.uri }}
                style={styles.previewImage}
              />
            </Pressable>
          ))}
        </ScrollView> */}
      </ScrollView>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  thumbnailContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  thumbnailWrapper: {
    position: 'relative',
    marginRight: 10,
  },
  thumbnail: {
    width: 100,
    height: 150,
  },
  deleteIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 12,
    padding: 2,
  },
  addButton: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'black',
  },
  previewImagesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  // previewImage: {
  //   width: 50,
  //   height: 50,
  //   marginHorizontal: 5,
  // },
  
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightgreen',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    marginLeft: 10,
  },
});