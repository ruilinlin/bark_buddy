import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EventScreen from "../screens/EventScreen";
import AddEvent from "../screens/AddEvent";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PostScreen from "../screens/PostScreen";
import ImageManager from "./ImageManager";
import ImageAlbumManager from './ImageAlbumManager';
import ImageFilterManager from "./ImageFilterManager";
import TextManager from "./TextManager";
import StepProgress from "./StepProgress";
import { colors } from "../helper/Color";

// const Stack = createStackNavigator();

// Define tab navigator for screens TakePhoto, Filter, and Album
const Tab = createBottomTabNavigator();
export default function PostNavigator() {
  return (
    <Tab.Navigator>
      {/* <Tab.Screen
        name="post"
        component={PostScreen}
        options={{
          headerShown: false // Hide header for the PostScreen
        }}
      /> */}
     <Tab.Screen 
        name="Album"
        component={ImageAlbumManager}
        options={{
          headerTitle: () => <StepProgress currentStep={1} totalSteps={3} />,
          tabBarStyle: { display: 'none' },
        }}
      />
{/*still need to finish the camera function */}
      {/* <Tab.Screen 
        name="Camera"
        component={ImageManager}
        options={{
          headerTitle: () => <StepProgress currentStep={2} totalSteps={4} />,
          tabBarStyle: { display: 'none' },
          // headerStyle: {
          //   backgroundColor: colors.backgroundlight, 
          // },
        }}
      /> */}



      <Tab.Screen 
        name="Filter"
        component={ImageFilterManager}
        options={{
          headerTitle: () => <StepProgress currentStep={2} totalSteps={3} />,
          tabBarStyle: { display: 'none' },
        }}
      />

      <Tab.Screen 
        name="Text"
        component={TextManager}
        options={{
          headerTitle: () => <StepProgress currentStep={3} totalSteps={3} />,
          tabBarStyle: { display: 'none' },
        }}
      />
    </Tab.Navigator>
  );
}
