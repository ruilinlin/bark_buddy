import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigationState } from '@react-navigation/native';
import PostScreen from "../screens/PostScreen";
import PostStack from "./PostStack";
import MapScreen from "../screens/MapScreen";
import MessageScreen from "../screens/MessageScreen";
import UserScreen from "../screens/UserScreen";
import EventStack from "./EventStack";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Post"
        component={PostStack}
        options={{
          headerTitle: "Posts",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventStack}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerTitle: "Map",
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessageScreen}
        options={{
          headerTitle: "Messages",
        }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
          headerTitle: "User",
        }}
      />
    </Tab.Navigator>
  );
}
