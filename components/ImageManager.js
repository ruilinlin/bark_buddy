import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View, Pressable, Text, Animated } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import GradientBackground from '../components/DarkBackGround';  // Ensure this is used if needed.
import { colors } from '../helper/Color';
import FloatingWindow from './FloatingWindow';
import { Entypo } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import NextButton from './NextButton';

export default function ImageManager({ receiveImageURI, navigation }) {
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageUri, setImageUri] = useState('');

  async function verifyPermission() {
    if (status.granted) {
      return true;
    }
    // try {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    // } 
    // catch (err) {
    //   console.log(err);
    //   Alert.alert("Error", "Failed to obtain camera permissions");
    // }
  }

  async function takeImageHandler() {
    try {
      const havePermission = await verifyPermission();
      if (!havePermission) {
        Alert.alert("Permission required", "We need your permission to open the camera");
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });

      if (result.canceled) {
        Alert.alert('Cancelled', 'Camera session was cancelled');
        return;
      }

      receiveImageURI(result.uri);
      setImageUri(result.uri);
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "An error occurred while taking the photo");
    }
  }

  // Optionally trigger camera on component mount
  useEffect(() => {
    takeImageHandler();
  }, []);

  function handleNext(){
    navigation.navigate('Filter');
  }

  function handleBack(){
    navigation.navigate('Album');
  }

  return (

    // <View style={styles.CameraButtonContainer}>
    //   {/* <FloatingWindow navigation={navigation} /> */}
    //   <Pressable style={styles.button} onPress={takeImageHandler}>
    //     <Entypo name="camera" size={21} color="#8e4585" />
    //     <Text>Take Photo</Text>
    //   </Pressable>
    // </View>
    <View style={styles.Container}>
      <Text>"STILL NEED TO WORKING, JUST JUMP THIS CAMERA SCREEN"</Text>
    <View style={styles.buttonContainer}>
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
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: { 
    flex: 1,
    backgroundColor: colors.lightbackgroundlight,
  },
  CameraButtonContainer:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flexDirection:"column",
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  nextButton: {
    backgroundColor: "rgba(136, 116, 163, 0.5)",
    flexDirection: 'row-reverse',
    width: 90,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    margin: 30,
    marginRight:400,
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
    marginLeft:400,
  },
});
