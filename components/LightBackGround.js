
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {colors} from '../helper/Color';

const LightBackGround = ({ children, style }) => {
  return (
    <LinearGradient
      colors={[colors.lightbackgrounddark, "white"]} 
      start={{ x: 0, y: 0 }} // Start point (0, 0) is top-left
      end={{ x: 4, y: 2 }}   // End point (1, 1) is bottom-right
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

export default LightBackGround;