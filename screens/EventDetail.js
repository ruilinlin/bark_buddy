import { StyleSheet, Text, View, Image, Alert, ScrollView } from "react-native";
import React from "react";
import PressableButton from "../components/PressableButton";
import { colors } from "../helper/Color";

const joinHandler = () => {
  Alert.alert("Successfully Joined!");
};

export default function EventDetail({ navigation, route }) {
  return (
    <View>
      <Image
        style={styles.image}
        source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
        resizeMode="cover" // cropped by size
      />
      <View style={styles.overlay}>
        <Text style={styles.overlayText}>Time1</Text>
      </View>
      <View style={styles.eventInfo}>
        <Text style={styles.eventName}>Event Name</Text>
        <View style={styles.container}>
          <View style={styles.eventDetailContainer}>
            <Text style={styles.eventDetail}>Location: Location1</Text>
            <Text style={styles.eventDetail}>Time: 2024.05.10 Tue 13:30</Text>
            <Text style={styles.eventDetail}>Organizer: j;alskdg a;sldkgj</Text>
          </View>
          <View style={styles.joinButtonContainer}>
            <PressableButton
              backgroundColor={colors.backgroundlight}
              onPress={joinHandler}
            >
              <Text style={styles.buttonText}>Join</Text>
            </PressableButton>
          </View>
        </View>
        <View style={styles.introductionContainer}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text style={styles.introduction}>
              The detail information about the event. The detail information
              about the event.The detail information about the event.The detail
              information about the event.The detail information about the
              event.The detail information about the event.The detail
              information about the event.The detail information about the
              event.The detail information about the event.The detail
              information about the event. The detail information about the
              event.The detail information about the event.The detail
              information about the event. The detail information about the
              event. The detail information about the event.The detail
              information about the event.The detail information about the
              event.The detail information about the event.The detail
              information about the event.The detail information about the
              event.The detail information about the event.The detail
              information about the event.
            </Text>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  eventInfo: {
    marginVertical: 25,
    marginHorizontal: 15,
  },
  image: {
    width: "100%",
    aspectRatio: 2, // set the height 1/2 as its width
    borderRadius: 5,
  },
  overlay: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // with opacity
    padding: 10,
    borderRadius: 5,
  },
  overlayText: {
    color: "#ffffff",
  },
  container: {
    flexDirection: "row",
  },
  eventDetailContainer: {
    flex: 3,
  },
  eventName: {
    fontSize: 30,
    color: "#ffffff",
    paddingVertical: 10,
  },
  eventDetail: {
    fontSize: 20,
    color: "#ffffff",
    paddingBottom: 5,
  },
  joinButtonContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  buttonText: {
    color: "#ffffff",
  },
  introductionContainer: {
    marginVertical: 5,
  },
  introduction: { color: "#ffffff", fontSize: 18, lineHeight: 25 },
});
