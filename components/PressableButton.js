import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";

export default function PressableButton({
  backgroundColor,
  onPress,
  children,
  customStyle,
}) {
  return (
    <Pressable
      // style={[styles.defaultStyle, { backgroundColor }]}
      style={({ pressed }) => [
        customStyle || styles.defaultStyle,
        {
          opacity: pressed ? 0.5 : 1,
          backgroundColor: backgroundColor,
        },
      ]}
      onPress={onPress}
      android_ripple={{ color: { backgroundColor } }}
    >
      <Text>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  defaultStyle: {
    margin: 10,
    width: 60,
    height: 30,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
