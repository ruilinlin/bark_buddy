import { Alert, StyleSheet, Text, View,Pressable } from 'react-native'
import React , {useState}from 'react'
import * as ImagePicker from "expo-image-picker";
import { async } from '@firebase/util';
import GradientBackground from '../components/DarkBackGround'
import { colors } from '../helper/Color';
import FloatingWindow from "./FloatingWindow";

export default function ImageManager({recieveImageURI,navigation}) {
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageUri,setImageUri] = useState('');

  async function vertifyPermission(){
    if (status.granted){
      return true;
    }
    try{
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }catch(err){
      console.log(err);
    }
  }

  async function takeImageHandler(){
    try{
      const havePermission =await vertifyPermission();
      if(!havePermission){
        Alert.alert("We need you permission to open cemera");
        return;
      }
      const results = await ImagePicker.launchCameraAsync({
        allowsEditing : true,
      });
      recieveImageURI(results.assets[0].uri);
      setImageUri(results.assets[0].uri);
    } catch (err){
      console.log(err);
    }


  }

  return (
    <View style={styles.Container}>
        <FloatingWindow navigation={navigation} />
    </View>
  )
}

const styles = StyleSheet.create({
  Container: { 
    flex: 1,
    backgroundColor: colors.lightbackgroundlight,
  },
})