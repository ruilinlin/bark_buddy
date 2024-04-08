import React from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';

const DynamicHeader = ({ title, scrollY, colors }) => {
  const headerHeight = scrollY.interpolate({
    inputRange: [-50, 0, 50],
    outputRange: [90, 90, 0],
    extrapolate: 'clamp',
  });

  return (
    <View>
      <Animated.View
        style={[
          styles.animated,
          { height: headerHeight },
          { transform: [{ translateY: scrollY }] },
          {
            backgroundColor: `rgba(99, 60, 92, 0.4)`, // still can not use gradient header
          },
        ]}
      >
        <Text style={styles.Text}>{title}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  Text: {
    textAlign: 'center',
    justifyContent: 'center',
  },
  animated: {
    justifyContent: 'center',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DynamicHeader;
