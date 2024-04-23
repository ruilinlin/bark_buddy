import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import { AppLoading } from "expo";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import AppStackNavigator from "./components/StackNavigator";
import * as Notifications from "expo-notifications";
import * as Font from "expo-font";
import { colors } from "./helper/Color";

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
    // show ActivityIndicator while fonts are loading
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.backgrounddark} />
      </View>
    );
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
