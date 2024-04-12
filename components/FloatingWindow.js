// In FloatingWindow.js
import React ,{useState, useRef}from 'react';
import { View, StyleSheet, TouchableOpacity, Text, PanResponder, Animated  } from 'react-native';

const FloatingWindow = ({ navigation }) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        Animated.spring(
          pan, // Auto-multiplexed
          { toValue: { x: 0, y: 0 }, useNativeDriver: false } // Return to start position
        ).start();
      },
    })
  ).current;
  return (
    <Animated.View
      style={[
        styles.floatingContainer,
        { transform: pan.getTranslateTransform() }
      ]}
      {...panResponder.panHandlers}
    >
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Camera')}>
        <Text style={styles.buttonText}>Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Album')}>
        <Text style={styles.buttonText}>Album</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Filter')}>
        <Text style={styles.buttonText}>Filter</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Text')}>
        <Text style={styles.buttonText}>Text</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};


const styles = StyleSheet.create({
  floatingContainer: {
    position: 'absolute',
    bottom: 20, 
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.6)', 
    borderRadius: 20, 
    padding: 10,
  },
  button: {
    backgroundColor: '#fff', 
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15, 
    marginVertical: 5, 
  },
  buttonText: {
    textAlign: 'center',
    color: '#000', 
    // fontSize:14,
  },
});

export default FloatingWindow;
