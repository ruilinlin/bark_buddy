import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { AppLoading } from "expo";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import AppStackNavigator from "./components/StackNavigator";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async function (notification) {
    //marking the function async will make it always return a resolved promise
    // you could use the info about incoming notification and do different behaviour for different notifications
    return {
      shouldShowAlert: true,
    };
  },
});

export default function App() {
  const [fontsLoaded] = useFonts({
    PhilosopherRegular: require("./assets/fonts/Philosopher-Regular.ttf"),
    PhilosopherBold: require("./assets/fonts/Philosopher-Bold.ttf"),
    AfterSmileRegular: require("./assets/fonts/AfterSmileRegular.otf"),
  });

  useEffect(() => {
    const sunscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("received listener", notification);
      }
    );
    return () => {
      sunscription.remove();
    };
  }, []);

  useEffect(() => {
    const sunscription = Notifications.addNotificationResponseReceivedListener(
      (notificationResponse) => {
        console.log(
          "received response listener",
          notificationResponse.notification.request.content.data.url
        );
        Linking.openURL(
          notificationResponse.notification.request.content.data.url
        );
      }
    );
    return () => {
      sunscription.remove();
    };
  }, []);

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
