import React from "react";
import { View, Image, StyleSheet, FlatList, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const imageSize = width / 3;

const RecentPostAlbum = ({ recentPosts }) => {
  return (
    <FlatList
      style={styles.listContainer}
      data={recentPosts}
      renderItem={({ item }) => (
        <View style={styles.row}>
          {item.images.map((imageUri, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image
                source={{ uri: imageUri }}
                style={[styles.image, { aspectRatio: 1 }]}
                resizeMode="cover"
              />
            </View>
          ))}
        </View>
      )}
      keyExtractor={(item) => item.id}
      numColumns={3}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
  },
  imageContainer: {
    width: imageSize,
    height: imageSize,
  },
  image: {
    flex: 1,
  },
});

export default RecentPostAlbum;
