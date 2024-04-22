import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EventScreen from "../screens/EventScreen";
import AddEvent from "../screens/AddEvent";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import EventDetail from "../screens/EventDetail";
import EventHeader from "./EventHeader";
import { colors } from "../helper/Color";
import { searchUsersByUserId } from "../firebase-files/firestoreHelper";
import { auth } from "../firebase-files/firebaseSetup";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function EventStack({ navigation }) {
  const [selectedScreen, setSelectedScreen] = useState("Event"); // Define selectedScreen state here
  const [haveUserInfo, setHaveUserInfo] = useState(false);

  console.log(haveUserInfo);

  async function fetchData() {
    try {
      const userData = await searchUsersByUserId(auth.currentUser.uid); // Fetch user data from DB
      if (userData) {
        setHaveUserInfo(true);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

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
          headerTransparent: true,
          headerLeft: null,
          // headerRight: () => (
          //   <Pressable
          //     onPress={() => navigation.navigate("AddEvent")}
          //     style={{ margin: 10 }}
          //   >
          //     <Ionicons
          //       name="add-circle-outline"
          //       size={24}
          //       color={colors.backgroundlight}
          //     />
          //   </Pressable>
          // ),
          headerRight: () =>
            haveUserInfo ? (
              <Pressable
                onPress={() => navigation.navigate("AddEvent")}
                style={{ margin: 10 }}
              >
                <Ionicons
                  name="add-circle-outline"
                  size={24}
                  color={colors.backgroundlight}
                />
              </Pressable>
            ) : (
              <Pressable
                onPress={() => {
                  Alert.alert(
                    "Alert",
                    "Please fill out your basic information in Profile Screen",
                    [{ text: "OK" }]
                  );
                }}
                style={{ margin: 10 }}
              >
                <Ionicons
                  name="add-circle-outline"
                  size={24}
                  color={colors.backgroundlight}
                />
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
          headerTintColor: colors.backgroundlight,
          headerTitle: "Event Detail",
          headerTitleStyle: {
            // fontFamily: "Futura-Bold",
            fontSize: 20,
          },
          headerTransparent: true,
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
