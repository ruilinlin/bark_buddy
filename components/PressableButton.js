import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

export default function PressableButton({
  title,
  backgroundColor,
  onPress,
  children,
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.defaultStyle,
        {
          opacity: pressed ? 0.5 : 1,
          backgroundColor: backgroundColor, 
        },
      ]}
      onPress={onPress}
      android_ripple={{ color: backgroundColor }} 
    >

      <Text>{title}</Text>
      {children}
    </Pressable>
  );
}

// Example styles, adjust as needed
const styles = StyleSheet.create({
  defaultStyle: {
    // Your default styles here, e.g. padding, margin
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
