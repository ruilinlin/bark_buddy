import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useState } from "react";
import Input from "../components/Input";
import DatePicker from "../components/DatePicker";
import PressableButton from "../components/PressableButton";
import { colors } from "../helper/Color";

export default function AddEvent({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [picture, setPicture] = useState("");
  const [date, setDate] = useState(null);

  const emptySubmissionAlert = () =>
    Alert.alert(
      "Empty Submission",
      "Please complete all the required information.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]
    );

  function writeNewEntry() {
    const newEntry = {
      title: title,
      description: description,
      location: location,
      picture: picture,
      date: date,
    };
    // writeToDB(newEntry);
  }

  function saveHandler() {
    validateInputs();
  }

  function validateInputs() {
    // Validate activity and date
    const isEmpty =
      title.length === 0 ||
      description.length === 0 ||
      // location.length === 0 ||
      date == null;
    if (isEmpty) {
      emptySubmissionAlert();
    }

    if (!isEmpty) {
      // writeNewEntry();
      // Navigate back to the previous screen
      // navigation.goBack();
    }
  }

  function titleChangeHandler(title) {
    setTitle(title);
  }
  function descriptionChangeHandler(description) {
    setDescription(description);
  }
  function locationChangeHandler(location) {
    setLocation(location);
  }
  function pictureChangeHandler(picture) {
    setPicture(picture);
  }
  function dateChangeHandler(date) {
    setDate(date);
  }
  function timeChangeHandler(time) {
    setTime(time);
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputsContainer}>
        <Input
          label="Title *"
          value={title}
          onChangeText={titleChangeHandler}
        />
        <Input
          label="Description *"
          value={description}
          onChangeText={descriptionChangeHandler}
        />
        {/* Need to add Location picker */}
        {/* Need to add Picture picker */}

        <DatePicker onDateChange={dateChangeHandler} savedDate={date} />
      </View>

      <View style={styles.downside}>
        <View style={styles.buttonsContainer}>
          <PressableButton
            backgroundColor={colors.backgrounddark}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.text}>Cancel</Text>
          </PressableButton>
          <PressableButton
            backgroundColor={colors.backgroundlight}
            onPress={saveHandler}
          >
            <Text style={styles.text}>Save</Text>
          </PressableButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   paddingTop: 30,
  // },
  // inputsContainer: {
  //   flex: 4 / 5,
  //   paddingHorizontal: 20,
  //   marginBottom: 20,
  // },
  // buttonsContainer: {
  //   flex: 1,
  //   flexDirection: "row",
  //   justifyContent: "space-around",
  // },
  // downside: {
  //   flex: 1 / 5,
  //   flexDirection: "column",
  // },
  text: {
    color: "#ffffff",
    fontWeight: "bold",
    width: "90%",
  },
});
