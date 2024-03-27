

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EventScreen from "../screens/EventScreen";
import AddEvent from "../screens/AddEvent";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PostScreen from "../screens/PostScreen";

const Stack = createStackNavigator();

export default function UserProgileStack({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="post"
        component={PostScreen}
        options={{
          headerRight: () => (
            <Pressable 
              onPress={() => navigation.navigate("AddEvent")}
              style={{ margin: 10 }}
            >
              <Ionicons name="add-circle-outline" size={24} color="black" />
            </Pressable>
          ),
          headerLeft: () => null, 
        }}
      />
    </Stack.Navigator>
  );
}
