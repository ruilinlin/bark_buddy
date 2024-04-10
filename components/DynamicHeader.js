import React, { useState } from 'react';
import { View, StyleSheet, Animated, Text ,Pressable} from 'react-native';
import { colors } from '../helper/Color';
import { Entypo } from '@expo/vector-icons';

const DynamicHeader = ({ title, onPress, scrollY , showAddButton}) => {
  const [showPostStack,setShowPostStack]= useState(false);
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 90],
    outputRange: [90, 0],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 90],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });


  return (
    <Animated.View
      style={[
        styles.header,
        { height: headerHeight },
        { opacity: headerOpacity },
      ]}
    >
      <Text style={styles.text}>{title}</Text>
      {showAddButton && <Pressable style={{ margin: 10 }} onPress ={onPress}>
      <Entypo name="camera" size={22} color="white" />
      </Pressable>}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center', 
    backgroundColor: 'rgba(99, 60, 92, 0.4)',
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  text: {
    textAlign: 'left',
    color: colors.lightavatarborder,
    fontSize: 20,
  },
});

export default DynamicHeader;
