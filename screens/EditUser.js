import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useState } from "react";
import GradientBackground from "../components/Background";
import Input from "../components/Input";
import PressableButton from "../components/PressableButton";
import { colors } from "../helper/Color";

export default function EditUser() {
  const [name, setName] = useState("");
  const [petNum, setPetNum] = useState("");
  const [pet, setPet] = useState([]);

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

  const invalidNameAlert = () =>
    Alert.alert(
      "Invalid Username",
      "Username must be 4 to 16 characters long and can only contain letters, numbers, and underscores.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]
    );

  const invalidPetNumAlert = () =>
    Alert.alert("Invalid Pet Number", "Pet Number must be a number >= 0.", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  function nameChangeHandler(name) {
    setName(name);
  }

  function petNumChangeHandler(petNum) {
    setPetNum(petNum);
  }

  function saveHandler() {
    validateInputs();
  }

  function validateInputs() {
    // Validate all the input fields
    const isEmpty = name.length === 0;

    // Validate username
    const isNameValid = /^[a-zA-Z0-9_]{4,16}$/.test(name); // Check if username matches the pattern

    // Validate petNum
    const isPetNumValid = /^\d+$/.test(petNum);

    if (!isNameValid) {
      invalidNameAlert();
    }

    if (!isPetNumValid) {
      invalidPetNumAlert();
    }

    if (isEmpty) {
      emptySubmissionAlert();
    }

    if (!isEmpty && isNameValid && isPetNumValid) {
      // save the info to the database and then navigate to the Tabs
      try {
        // Write new entry to the database
      } catch (error) {
        console.error("Error saving to database:", error);
        // Handle database error
      }
    }
  }

  return (
    <GradientBackground>
      <View style={styles.container}>
        <View style={styles.inputsContainer}>
          <Input label="Name *" value={name} onChangeText={nameChangeHandler} />
          {/* Need to add Picture picker */}
          <Input
            label="How many puppies do you have? *"
            value={petNum}
            onChangeText={petNumChangeHandler}
          />
        </View>
        <View style={styles.downside}>
          <View style={styles.buttonsContainer}>
            <PressableButton
              backgroundColor={colors.backgrounddark}
              // onPress={() => navigation.goBack()}
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
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  inputsContainer: {
    flex: 4,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  downside: {
    flex: 1,
    flexDirection: "column",
  },
  text: {
    color: "#ffffff",
    fontWeight: "bold",
    width: "90%",
  },
});
