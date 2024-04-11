import React from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import LottieView from 'lottie-react-native';
import { colors } from '../helper/Color';

const screenWidth = Dimensions.get('window').width;

const StepProgress = ({ currentStep }) => {
  const totalSteps = 4;
  // Calculate the width of the completed portion
  const completedWidth = (screenWidth / totalSteps) * currentStep;
  
  // Determine the position of the dog based on the current step, adjusting for the dog's size
  const dogPosition = (screenWidth / totalSteps) * currentStep - (screenWidth / totalSteps) / 2 -60;

  return (
    <View style={styles.container}>
      <View style={[styles.completedStep, { width: completedWidth  }]} />
      <Animated.View style={[styles.dog, { transform: [{ translateX: dogPosition }] }]}>
        <LottieView
          source={require('../assets/animate/dogwalk.json')}
          autoPlay
          loop
          style={{ width: 80, height: 80 }} 
         
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    // position: 'relative',
    width: screenWidth-30,
    height: 5, 
    backgroundColor: colors.backgrounddark, 
  },
  completedStep: {
    position: 'absolute',
    height: '100%',
    backgroundColor: colors.lightbackgroundlight, 
  },
  dog: {
    position: 'absolute',
    top: -45, 
  },
});

export default StepProgress;
