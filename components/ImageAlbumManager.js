import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, StyleSheet, Pressable ,Text, Animated , AlertDimensions, Platform,Dimensions,Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import FloatingWindow from "./FloatingWindow";
import { colors } from '../helper/Color';
import ImageViewer from './PostImageViewer';
import LottieView from 'lottie-react-native';
import NextButton from './NextButton';
import { MaterialIcons } from '@expo/vector-icons';
import ImageFilterManager from './ImageFilterManager';

export default function ImageAlbumManager({ navigation }) {
  const [images, setImages] = useState([]);
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageUri, setImageUri] = useState('');

  useEffect(() => {
    pickImage();
    // takeImageHandler();
  }, []);
  // Function to verify camera permission
  async function verifyPermission() {
    if (status.granted) {
      return true;
    }
    try {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Failed to obtain camera permissions");
    }
  }

  // Function to handle taking an image with the camera
  async function takeImageHandler() {
    try {
      // Check if the app has camera permission
      const havePermission = await verifyPermission();
      if (!havePermission) {
        Alert.alert("Permission required", "We need your permission to open the camera");
        return;
      }

      // Launch the camera
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });

      // Check if the user canceled the camera session
      if (result.canceled) {
        // Alert.alert('Cancelled', 'Camera session was cancelled');
        return;
      }

      // Update the image URI and pass it to the parent component
      // receiveImageURI(result.uri);
      setImageUri(result.uri);
      setImages([...images, { uri: result.uri, deletable: true }]);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "An error occurred while taking the photo");
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      presentationStyle: ImagePicker.UIImagePickerPresentationStyle.AUTOMATIC,
      UIImagePickerPresentationStyle: 'formSheet',
      // allowsEditing: true,
      aspect: [3, 5],
      quality: 0,
      selectionLimit: 0,
      allowsMultipleSelection: true,
    });

    // console.log(result);

    if (!result.canceled && result.assets) {
      const imgData = result.assets.map(asset => ({
        uri: asset.uri,
        height: asset.height,
        width: asset.width,
        // mimeType: asset.mimeType,
        // fileSize: asset.fileSize,
        // fileName: asset.fileName
      }));
    
      setImages([...images, ...imgData]);
      console.log(result)
      // navigation.navigate('Filter', { images: imgData });
    }
  };

  function handleBack(){
    navigation.navigate('Posts');
  }

  function handleNext() {
    if (images.length === 0) {
      Alert.alert("No Images Selected", "Please select at least one image.");
    } else {
      navigation.navigate('Filter', { images: images });
    }
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
            {images.length > 0 && (
              <Pressable onPress={pickImage} style={styles.addButton}>
                <Text style={styles.addButtonText}>Add</Text>
              </Pressable>
            )}
        </ScrollView>

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
        <Text style={styles.text}>Cancel</Text>
      </Pressable>

        <Pressable onPress={takeImageHandler} style={styles.cameraButton}>
            <MaterialIcons name="photo-camera" size={20} color={colors.lightbackgroundlight} />
          </Pressable>

          <Pressable onPress={handleNext} style={[styles.nextButton, { opacity: images.length > 0 ? 1 : 0.2 }]}>
          <Animated.View>
            <LottieView
              source={require('../assets/animate/nextarrow.json')}
              autoPlay
              loop
              style={{ width: 30, height: 40 }}
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
    backgroundColor: colors.lightbackgroundlight,
    justifyContent: 'space-between', // Adjust vertical spacing
  },
  scrollViewContent: {
    flexGrow: 1,
    flex: 3,
  },
  thumbnailContainer: {
    padding: 10,
    ...Platform.select({
      'android': { flexDirection: Dimensions.get('window').width > 500 ? 'column' : 'row' },
      'ios': { flexDirection: Dimensions.get('window').width > 600 ? 'column' : 'row' },
      'default': { flexDirection: 'row' },
    }),
  },
  thumbnailWrapper: {
    position: 'relative',
    marginRight: 10,
    marginBottom: 10, // Add margin bottom for better spacing
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
    marginBottom: 10, // Add margin bottom for better spacing
  },
  addButtonText: {
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    flex: 1,
  },
  backButton: {
    backgroundColor: "rgba(136, 116, 163, 0.5)",
    flexDirection: "row-reverse",
    width: 95,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: 'center', 
    margin: 10,
    padding: 5, // Ensure content is not squeezed
  },
  nextButton: {
    backgroundColor: "rgba(136, 116, 163, 0.5)",
    flexDirection: "row-reverse",
    width: 90,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: 'center', 
    margin: 10,
    padding: 5, // Ensure content is not squeezed
  },
  text: {
    marginLeft: 10,
  },
  cameraButton: {
    backgroundColor: "rgba(136, 116, 163, 0.5)",
    flexDirection: "row-reverse",
    width: 50,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: 'center', 
    margin: 10,
    padding: 5, // Ensure content is not squeezed
  },
});