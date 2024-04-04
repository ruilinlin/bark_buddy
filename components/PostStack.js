import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EventScreen from "../screens/EventScreen";
import AddEvent from "../screens/AddEvent";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PostScreen from "../screens/PostScreen";
import ImageManager from "./ImageManager";

const Stack = createStackNavigator();

export default function PostStack({ navigation }) {
  
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="post"
        component={PostScreen}
        options={{
          headerRight: () => (
            <ImageManager />
          ),
          headerLeft: () => null,
        }}
      />
    </Stack.Navigator>
  );
}
