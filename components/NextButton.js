import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { colors } from '../helper/Color';

export default function NextButton({ handleNext, style, text }) {
  return (
    <View style={styles.nextButtonContainer}>
      <Pressable onPress={handleNext} style={[styles.nextButton, style]}>
        <LottieView
          source={require('../assets/animate/nextarrow.json')}
          autoPlay
          loop
          style={{ width: 40, height: 40 }} 
        />
        <Text style={styles.Text}>{text}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  nextButtonContainer: {
    alignItems: "flex-end",
  },
  nextButton: {
    backgroundColor: "rgba(136, 116, 163, 0.5)",
    flexDirection: "row-reverse",
    width: 90,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: 'center', 
    margin: 10,
    padding: 5, // Ensure content is not squeezed
  },
  Text: {
    color: colors.lightbackgroundlight,
    fontSize: 14,
  }
});
