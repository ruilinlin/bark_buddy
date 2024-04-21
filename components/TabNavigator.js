import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  useNavigationState,
} from "@react-navigation/native";
import PostScreen from "../screens/PostScreen";
import PostStack from "./PostStack";
import MapScreen from "../screens/MapScreen";
import MessageScreen from "../screens/MessageScreen";
import UserScreen from "../screens/UserScreen";
import EventStack from "./EventStack";
import UserProfileStack from "./UserProfileStack";
import { BlurView } from "expo-blur";
import { colors } from "../helper/Color";
import { Ionicons, MaterialIcons, FontAwesome6 } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { position: "absolute" },
        tabBarBackground: () => (
          <BlurView
            tint="default"
            intensity={100}
            style={StyleSheet.absoluteFill}
            experimentalBlurMethod={"dimezisBlurView"}
          />
        ),
        tabBarActiveTintColor: colors.backgroundlight,
        tabBarInactiveTintColor: colors.backgrounddark,
      }}
    >
      <Tab.Screen
        name="Post"
        component={PostStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="paw" size={24} color={color} />
          ),
          headerTitle: "Posts",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventStack}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="event" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="map-location-dot" size={24} color={color} />
          ),
          headerTitle: "Map",
          headerShown: false,
        }}
      />
      {/* <Tab.Screen
        name="Messages"
        component={MessageScreen}
        options={{
          headerTitle: "Messages",
        }}
      /> */}
      <Tab.Screen
        name="Profile"
        component={UserProfileStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
