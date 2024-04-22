import React, { useState } from "react";
import { View, StyleSheet, Animated, Text, Pressable } from "react-native";
import { colors } from "../helper/Color";
import { Entypo } from "@expo/vector-icons";

const DynamicHeader = ({ title, onPress, scrollY, showAddButton }) => {
  const [showPostStack, setShowPostStack] = useState(false);
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [100, 0],
    extrapolate: "clamp",
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: "clamp",
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
      {showAddButton && (
        <Pressable style={{ margin: 10 }} onPress={onPress}>
          <Entypo name="camera" size={21} color="#8e4585" />
        </Pressable>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: 'rgba(129, 90, 122, 0.4)',
    backgroundColor: "white",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  text: {
    fontFamily: "AfterSmile-Regular",
    textAlign: "left",
    color: "#8e4585",
    fontSize: 28,
    marginLeft: -2,
  },
});

export default DynamicHeader;
