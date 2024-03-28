import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

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
        <Text style={{ color: selectedScreen === "Event" ? "blue" : "black" }}>
          Events
        </Text>
      </Pressable>
      <Pressable
        onPress={() => handleScreenChange("MyEvents")}
        style={styles.pressable}
      >
        <Text
          style={{ color: selectedScreen === "MyEvents" ? "blue" : "black" }}
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
