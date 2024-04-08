import React from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import { colors } from '../helper/Color';
import ImageManager from './ImageManager';
const DynamicHeader = ({ title, scrollY , showAddButton}) => {
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
      {showAddButton && <ImageManager />}
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
