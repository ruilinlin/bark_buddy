import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostScreen from "../screens/PostScreen";
import MapScreen from "../screens/MapScreen";
import MessageScreen from "../screens/MessageScreen";
import UserScreen from "../screens/UserScreen";
import StackNavigator from "./StackNavigator";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Posts"
        component={PostScreen}
        options={{
          headerTitle: "Posts",
        }}
      />
      <Tab.Screen
        name="Events"
        component={StackNavigator}
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
