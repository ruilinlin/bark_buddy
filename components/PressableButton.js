import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";

export default function PressableButton({
  backgroundColor,
  onPress,
  children,
}) {
  return (
    <Pressable
      // style={[styles.defaultStyle, { backgroundColor }]}
      style={({ pressed }) => [
        styles.defaultStyle,
        {
          opacity: pressed ? 0.5 : 1,
          backgroundColor: backgroundColor,
        },
      ]}
      onPress={onPress}
      android_ripple={{ color: { backgroundColor } }}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  defaultStyle: {
    margin: 10,
    width: 120,
    height: 30,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
