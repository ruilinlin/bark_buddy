import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import UserScreen from "../screens/UserScreen";
import EditUser from "../screens/EditUser";
import { BlurView } from "expo-blur";
import { View, StyleSheet, Text } from "react-native";
import { colors } from "../helper/Color";

const Stack = createStackNavigator();

export default function UserProfileStack({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="User"
        component={UserScreen}
        options={{
          // header: () => <HeaderWithBlur />,
          headerTitleStyle: { fontFamily: "PhilosopherBold", fontSize: 25 },
          headerTransparent: true,
          headerTintColor: colors.backgroundlight,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("EditUser")}
              style={{ margin: 10 }}
            >
              <MaterialCommunityIcons
                name="account-edit-outline"
                size={24}
                color={colors.backgroundlight}
              />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="EditUser"
        component={EditUser}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
