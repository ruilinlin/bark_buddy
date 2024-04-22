import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const RecentPostAlbum = ({ recentPosts }) => {
  return (
    <View style={styles.container}>
      {recentPosts.map((post, index) => (
        <View key={index} style={styles.postContainer}>
          <Image
            source={{ uri: post.images[0] }}
            style={styles.image}
            resizeMode="cover"
          />
          {post.images.length > 1 && (
            <Ionicons
              name="images-outline"
              size={10}
              color="white"
              style={styles.icon}
            />
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  postContainer: {
    position: "relative",
    width: 100,
    height: 90,
    margin: 5,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  icon: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 5,
    padding: 4,
  },
});

export default RecentPostAlbum;
