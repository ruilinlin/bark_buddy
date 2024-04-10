import React from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import LottieView from 'lottie-react-native';

const screenWidth = Dimensions.get('window').width;

const StepProgress = ({ currentStep }) => {
  const totalSteps = 4;
  // Calculate the width of the completed portion
  const completedWidth = (screenWidth / totalSteps) * currentStep;
  
  // Determine the position of the dog based on the current step, adjusting for the dog's size
  const dogPosition = (screenWidth / totalSteps) * currentStep - (screenWidth / totalSteps) / 2 -60;

  return (
    <View style={styles.container}>
      <View style={[styles.completedStep, { width: completedWidth }]} />
      <Animated.View style={[styles.dog, { transform: [{ translateX: dogPosition }] }]}>
        <LottieView
          source={require('../assets/animate/dogwalk.json')}
          autoPlay
          loop
          style={{ width: 100, height: 100 }} // Adjust the size as needed
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: screenWidth,
    height: 50, // Adjust based on your dog animation size
    backgroundColor: '#e0e0e0', // Background color for the uncompleted part
  },
  completedStep: {
    position: 'absolute',
    height: '100%',
    backgroundColor: '#4caf50', // Change to your desired completion color
  },
  dog: {
    position: 'absolute',
    top: -45, // Adjust this value to position the dog correctly above the progress bar
  },
});

export default StepProgress;
