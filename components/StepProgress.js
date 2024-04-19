import React from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import LottieView from 'lottie-react-native';
import { Entypo, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { colors } from '../helper/Color';

const screenWidth = Dimensions.get('window').width;

const StepProgress = ({ currentStep }) => {
  const steps = [
    { name: "Album", icon: { library: 'MaterialIcons', name: 'filter', size: 16 } },
    // { name: "Camera", icon: { library: 'Entypo', name: 'camera', size: 16 } }, 
    { name: "Filter", icon: { library: 'Ionicons', name: 'color-filter-sharp', size: 16 } },
    { name: "Text", icon: { library: 'MaterialIcons', name: 'text-fields', size: 16 } },
  ];

  const renderIcon = (iconData, isActive) => {
    const { library, name, size } = iconData;
    const color = isActive ? '#8e4585' : '#b0aeb1';
    
    switch(library) {
      case 'Entypo':
        return <Entypo name={name} size={size} color={color} />;
      case 'MaterialIcons':
        return <MaterialIcons name={name} size={size} color={color} />;
      case 'Ionicons':
        return <Ionicons name={name} size={size} color={color} />;
      default:
        return null;
    }
  };

  const totalSteps = 3;
  const completedWidth = (screenWidth / totalSteps) * currentStep;
  const dogPosition = (screenWidth / totalSteps) * currentStep - (screenWidth / totalSteps) / 2 - 20;

  return (
    <View style={styles.container}>
      {steps.map((step, index) => {
        const isActive = index < currentStep; // Assuming currentStep is 0-based; adjust if it's 1-based
        return (
          <View key={index} style={[styles.stepContainer, { left: ((screenWidth / totalSteps) * index) }]}>
            {renderIcon(step.icon, isActive)}
            <Text style={[styles.stepText, { color: isActive ? '#8e4585' : '#b0aeb1', position: 'relative', top: 8 }]}>{step.name}</Text>
          </View>
        );
      })}
      <View style={[styles.completedStep, { width: completedWidth }]} />
      <Animated.View style={[styles.dog, { transform: [{ translateX: dogPosition }] }]}>
        <LottieView source={require('../assets/animate/dogwalk.json')} autoPlay loop style={{ width: 70, height: 70 }} />
      </Animated.View>
    </View>
  );
};

// Style definitions remain the same

    
    
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    // position: 'relative',
    width: screenWidth-30,
    height: 4, 
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
  
  stepContainer: {
    position: 'absolute',
    bottom: -11, 
    alignItems: 'center', 
  },
  stepText: {
    marginTop:2,
    color: colors.shadowColor, 
    fontSize: 12,
  },
});

export default StepProgress;
