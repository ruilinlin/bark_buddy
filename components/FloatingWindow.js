// In FloatingWindow.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const FloatingWindow = ({ navigation }) => {
  return (
    <View style={styles.floatingContainer}>
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
    </View>
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
