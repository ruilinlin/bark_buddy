import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import PressableButton from "../components/PressableButton";
import { colors } from "../helper/Color";

export default function StartScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isEntered, setIsEntered] = useState(false);

  useEffect(() => {
    // Check if both email and phone number fields are empty
    setIsEntered(email || password ? true : false);
  }, [email, password]);

  function changeEmailHandler(changedEmail) {
    setEmail(changedEmail);
    setEmailError(""); // Clear error when email changes
  }

  function changePasswordHandler(changedPassword) {
    setPassword(changedPassword);
    setPasswordError(""); // Clear error when phone number changes
  }

  function validateInputs() {
    // Validate name
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isEmailValid) {
      setEmailError("Please enter a valid email address");
    }

    // Validate password
    // At least 8 characters long ({8,})
    // Contains at least one uppercase letter ((?=.*[A-Z]))
    // Contains at least one lowercase letter ((?=.*[a-z]))
    // Contains at least one number ((?=.*\d))
    // Contains at least one special character ((?=.*[@$!%*?&]))
    // Allows only specific special characters: @$!%*?&
    const isPasswordValid =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      );
    if (!isPasswordValid) {
      setPasswordError(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
    }

    // Check if both inputs are valid
    if (isEmailValid && isPasswordValid) {
      startHandler();
    }
  }

  // After validate inputs, navigate to AllActivities
  function startHandler() {
    navigation.navigate("TabNavigator");
  }

  function resetHandler() {
    setEmail("");
    setPassword("");
    setEmailError("");
    setPasswordError("");
    setIsEntered(false);
  }

  return (
    <View style={styles.container}>
      <Input
        label="Email Address"
        value={email}
        onChangeText={changeEmailHandler}
        error={emailError}
      />
      <Input
        label="Password"
        value={password}
        onChangeText={changePasswordHandler}
        error={passwordError}
      />

      <View style={styles.buttonsContainer}>
        <PressableButton
          backgroundColor={colors.backgroundlight}
          onPress={resetHandler}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </PressableButton>
        <View style={styles.buttonView}>
          <PressableButton
            backgroundColor={isEntered ? "#d0e1f9" : "grey"}
            onPress={validateInputs}
          >
            <Text style={styles.buttonText}>Start</Text>
          </PressableButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.backgrounddark,
    //   alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 10,
  },
  buttonText: { color: "#ffffff" },
});
