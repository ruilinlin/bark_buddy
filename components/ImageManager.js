import { Alert, StyleSheet, Text, View } from 'react-native'
import React , {useState}from 'react'
import * as ImagePicker from "expo-image-picker";
import { async } from '@firebase/util';
import { Ionicons } from "@expo/vector-icons";

export default function ImageManager(recieveImageURI) {
  const [status, requestPermission] = ImagePicker.useCemeraPermission();
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
    <View>
      <Pressable style={{ margin: 10 }} onPress ={takeImageHandler}>
        <Ionicons name="add-circle-outline" size={24} color="black" />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({})