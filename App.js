import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { AppLoading } from "expo";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import AppStackNavigator from "./components/StackNavigator";
import * as Notifications from "expo-notifications";
import * as Font from "expo-font";

Notifications.setNotificationHandler({
  handleNotification: async function (notification) {
    return {
      shouldShowAlert: true,
    };
  },
});

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFontsAsync = async () => {
      try {
        await Font.loadAsync({
          "Philosopher-Regular": require("./assets/fonts/Philosopher-Regular.ttf"),
          "Philosopher-Bold": require("./assets/fonts/Philosopher-Bold.ttf"),
          "AfterSmile-Regular": require("./assets/fonts/AfterSmile-Regular.otf"),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error("Error loading font", error);
      }
    };

    loadFontsAsync();
  }, []);

  if (!fontsLoaded) {
    // Return a loading indicator or null until fonts are loaded
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <AppStackNavigator />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    ...StyleSheet.absoluteFillObject,
    height: null,
  },
});
