import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EventScreen from "../screens/EventScreen";
import AddEvent from "../screens/AddEvent";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();

export default function StackNavigator({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Event"
        component={EventScreen}
        options={{
          headerTitle: "Events",
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("AddEvent")}
              style={{ margin: 10 }}
            >
              <Ionicons name="add-circle-outline" size={24} color="black" />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="MyEvents"
        component={EventScreen}
        options={{
          headerTitle: "My Events",
          // headerRight: () => (
          //   <Pressable onPress={() => addEventHandler()} style={{ margin: 10 }}>
          //     <Ionicons name="add-circle-outline" size={24} color="black" />
          //   </Pressable>
          // ),
        }}
      />
      <Stack.Screen
        name="AddEvent"
        component={AddEvent}
        options={{
          headerTitle: "Add An Event",
        }}
      />
    </Stack.Navigator>
  );
}
