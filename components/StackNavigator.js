import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignupScreen from "../screens/SignupScreen";
import LoginScreen from "../screens/LoginScreen";
import TabNavigator from "./TabNavigator";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-files/firebaseSetup";
import { NavigationContainer } from '@react-navigation/native';


const Stack = createStackNavigator();

export default function AppStackNavigator() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isVisitor, setIsVisitor] = useState(false); 

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLoggedIn(true);
        setIsVisitor(false);
      } else {
        setUserLoggedIn(false);
      }
    });
  }, []);

  // const AuthStack = (
  //   <>
  //     <Stack.Screen name="Signup" component={SignupScreen} />
  //     <Stack.Screen name="Login" component={(props) => <LoginScreen {...props} setIsVisitor={setIsVisitor} />} />
  //   </>
  // );


  // const AppStack = (
  //   <>
  //     <Stack.Screen
  //       name="TabNavigator"
  //       component={TabNavigator}
  //       options={{ headerShown: false }}
  //     />
  //   </>
  // );

  return (
    <Stack.Navigator initialRouteName="Signup" screenOptions={{ headerShown: false }}>
      {userLoggedIn || isVisitor ? (
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      ) : (
        <>
          <Stack.Screen name="Signup">
            {(props) => <SignupScreen {...props} setIsVisitor={setIsVisitor} />}
          </Stack.Screen>
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} setIsVisitor={setIsVisitor} />}
          </Stack.Screen>
        </>
      )}
    </Stack.Navigator>
  );
}