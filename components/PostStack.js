import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EventScreen from "../screens/EventScreen";
import AddEvent from "../screens/AddEvent";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PostScreen from "../screens/PostScreen";
import ImageManager from "./ImageManager";
import ImageAlbumManager from './ImageAlbumManager';
import ImageFilterManager from "./ImageFilterManager";

const Stack = createStackNavigator();

export default function PostStack({ navigation }) {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="post"
        component={PostScreen}
        options={
        //   {
        //   headerRight: () => (
        //   <Pressable style={{ margin: 10 }} onPress ={()=>navigation.navigate("Album")}>
        //     <Ionicons name="add-circle-outline" size={24} color="black" />
        //   </Pressable>
        //   ),
        //   headerLeft: () => null,
        // }
        { headerShown: false }}
      />
      <Stack.Screen 
        name="Album"
        component={ImageAlbumManager}
      />
      <Stack.Screen 
        name="Filter"
        component={ImageFilterManager}
      />

    </Stack.Navigator>
  );
}
