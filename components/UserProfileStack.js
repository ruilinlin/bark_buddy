import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import UserScreen from "../screens/UserScreen";
import EditUser from "../screens/EditUser";

const Stack = createStackNavigator();

export default function UserProfileStack({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="User"
        component={UserScreen}
        options={{
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("EditUser")}
              style={{ margin: 10 }}
            >
              <MaterialCommunityIcons
                name="account-edit-outline"
                size={24}
                color="black"
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
