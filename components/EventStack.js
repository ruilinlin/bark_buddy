import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EventScreen from "../screens/EventScreen";
import AddEvent from "../screens/AddEvent";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import EventDetail from "../screens/EventDetail";
import EventHeader from "./EventHeader";

const Stack = createStackNavigator();

export default function EventStack({ navigation }) {
  const [selectedScreen, setSelectedScreen] = useState("Event"); // Define selectedScreen state here

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Event"
        // component={EventScreen}
        // initialParams={{ selectedScreen: selectedScreen }} // Pass selectedScreen as initialParams
        options={{
          headerTitle: () => (
            <EventHeader
              selectedScreen={selectedScreen}
              setSelectedScreen={setSelectedScreen}
            />
          ), // Pass setSelectedScreen function here
          headerLeft: null,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("AddEvent")}
              style={{ margin: 10 }}
            >
              <Ionicons name="add-circle-outline" size={24} color="black" />
            </Pressable>
          ),
        }}
      >
        {() => (
          <EventScreen
            navigation={navigation}
            selectedScreen={selectedScreen}
          />
        )}
      </Stack.Screen>
      {/* <Stack.Screen
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
      /> */}
      <Stack.Screen
        name="AddEvent"
        component={AddEvent}
        options={{
          headerTitle: "Add An Event",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EventDetail"
        component={EventDetail}
        options={{
          headerTitle: "Event Detail",
        }}
      />
    </Stack.Navigator>
  );
}
