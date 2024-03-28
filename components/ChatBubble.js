import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChatBubble = ({ children }) => {
  return (
    <View style={styles.bubbleContainer}>
      <View style={styles.bubble}>
        {children}
      </View>
      <View style={styles.bubbleTail} />
    </View>
  );
};

const styles = StyleSheet.create({
  bubbleContainer: {
    flexDirection: 'row', 
    alignItems: 'flex-end', 
  },
  bubble: {
    backgroundColor: '#E1F5FE',
    borderRadius: 20,
    padding: 10,
    maxWidth: '80%', 
  },
  bubbleTail: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#E1F5FE', // Match the bubble's background color
    transform: [{ rotate: '45deg' }], // Adjust angle if necessary
    marginLeft: -10, // Adjust positioning of the tail relative to the bubble
  },
});

export default ChatBubble;
