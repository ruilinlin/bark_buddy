import { StyleSheet, Text, View, Image, Alert, Pressable } from "react-native";
import React from "react";
import PressableButton from "./PressableButton";
import { colors } from "../helper/Color";
import { useNavigation } from "@react-navigation/native"; // Import the useNavigation hook
import { auth } from "../firebase-files/firebaseSetup";
import { deleteFromDB } from "../firebase-files/firestoreHelper";

export default function EventItem({
  name,
  location,
  time,
  imageUrl,
  eventId,
  userId,
  selectedScreen,
}) {
  const navigation = useNavigation(); // Access the navigation object using useNavigation hook

  function onPress() {
    navigation.navigate("EventDetail", { id: eventId, userId: userId });
  }

  const joinHandler = () => {
    Alert.alert("Successfully Joined!");
  };

  const editHandler = () => {
    navigation.navigate("AddEvent", {
      id: eventId,
      userId: userId,
    });
  };

  const deleteHandler = () => {
    deleteFromDB(eventId, "events");
  };

  const isCurrentUserOwner = userId === auth.currentUser.uid;

  return (
    <Pressable onPress={onPress}>
      <View style={styles.eventItem}>
        <Image
          style={styles.image}
          source={{ uri: imageUrl }}
          resizeMode="cover" // cropped by size
        />
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>{time}</Text>
        </View>
        <Text style={styles.eventName}>{name}</Text>
        <View style={styles.container}>
          <View style={styles.eventDetailContainer}>
            <Text style={styles.eventDetail}>Location: {location}</Text>
            <Text style={styles.eventDetail}>Time: {time}</Text>
          </View>
          <View style={styles.buttonContainer}>
            {isCurrentUserOwner && (
              <View style={styles.buttonContainer}>
                <PressableButton
                  backgroundColor={colors.backgroundlight}
                  onPress={editHandler}
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </PressableButton>
                <PressableButton
                  backgroundColor={colors.backgroundlight}
                  onPress={deleteHandler}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </PressableButton>
              </View>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  eventItem: {
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
    // fontFamily: "Futura-Bold",
    color: "#ffffff",
  },
  container: {
    flexDirection: "row",
  },
  eventDetailContainer: {
    flex: 3,
  },
  eventName: {
    // fontFamily: "Futura-Bold",
    fontSize: 30,
    color: "#ffffff",
    paddingVertical: 10,
  },
  eventDetail: {
    // fontFamily: "Futura",
    fontSize: 20,
    color: "#ffffff",
    paddingBottom: 5,
  },
  buttonContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  buttonText: {
    // fontFamily: "Futura",
    color: "#ffffff",
  },
});
