import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const GradientBackground = ({ colors, children, style }) => {
  const { backgrounddark, backgroundlight } = colors;
  return (
    <LinearGradient
      colors={[backgrounddark, backgroundlight]} 
      start={{ x: 0, y: 0 }} // Start point (0, 0) is top-left
      end={{ x: 3, y: 2 }}   // End point (1, 1) is bottom-right
      style={{ ...styles.card, ...style }}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1, 
  },
});

export default GradientBackground;
