import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../helper/Color";

export default function EventHeader({ selectedScreen, setSelectedScreen }) {
  const handleScreenChange = (screenName) => {
    setSelectedScreen(screenName);
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => handleScreenChange("Event")}
        style={styles.pressable}
      >
        <Text
          style={{
            color:
              selectedScreen === "Event" ? "white" : colors.backgroundlight,
            // fontFamily: "Futura-Bold",
            fontSize: 18,
          }}
        >
          Events
        </Text>
      </Pressable>
      <Pressable
        onPress={() => handleScreenChange("MyEvents")}
        style={styles.pressable}
      >
        <Text
          style={{
            color:
              selectedScreen === "MyEvents" ? "white" : colors.backgroundlight,
            // fontFamily: "Futura-Bold",
            fontSize: 18,
          }}
        >
          My Events
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center" },
  pressable: {
    margin: 10,
  },
});
