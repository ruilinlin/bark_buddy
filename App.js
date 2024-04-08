import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from "react-native";

import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import AppStackNavigator from "./components/StackNavigator";

export default function App() {
  // const [fontsLoaded, setFontsLoaded] = useState(false);

  // const loadFonts = async () => {
  //   await useFonts({
  //     "Midorima-PersonalUse-Regular": require('./assets/fonts/Midorima-PersonalUse-Regular.ttf'), 
  //   });
  // };

  // useEffect(() => {
  //   const load = async () => {
  //     await loadFonts();
  //     setFontsLoaded(true);
  //   };
  //   load();
  // }, []);

  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }

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
