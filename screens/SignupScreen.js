import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { auth } from "../firebase-files/firebaseSetup";
import TabNavigator from "../components/TabNavigator";
import GradientBackground from "../components/DarkBackGround";
import { colors } from "../helper/Color";
import PressableButton from "../components/PressableButton";

export default function SignupScreen({ navigation, setIsVisitor }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const loginHandler = () => {
    navigation.replace("Login");
  };

  // const VisitorHandler = () => {
  //   // Update isVisitor state
  //   setIsVisitor(true);
  //   // Navigate to TabNavigator
  //   navigation.navigate('TabNavigator');
  // };

  const signupHandler = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Fields should not be empty");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Passwords don't match");
      return;
    }
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCred);
    } catch (err) {
      console.log(err.code);
      if (err.code === "auth/email-already-in-use") {
        Alert.alert("this email is already signed up");
      } else if (err.code === "auth/weak-password") {
        Alert.alert("your password is weak");
      }
    }
  };
  return (
    <GradientBackground colors={colors}>
      <View style={styles.container}>
        <Text style={styles.title}>Bark Buddy</Text>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={colors.backgroundlight}
          value={email}
          onChangeText={(changedText) => {
            setEmail(changedText);
          }}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor={colors.backgroundlight}
          value={password}
          onChangeText={(changedText) => {
            setPassword(changedText);
          }}
        />
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Confirm Password"
          placeholderTextColor={colors.backgroundlight}
          value={confirmPassword}
          onChangeText={(changedText) => {
            setConfirmPassword(changedText);
          }}
        />
        <View style={styles.buttonContainer}>
          <PressableButton
            backgroundColor={colors.backgroundlight}
            onPress={signupHandler}
          >
            <Text style={styles.buttonText}>Register</Text>
          </PressableButton>
          <PressableButton
            backgroundColor={colors.backgroundlight}
            onPress={loginHandler}
            customStyle={styles.buttonStyle}
          >
            <Text style={styles.buttonText}>Already Registered? Login</Text>
          </PressableButton>
        </View>
        {/* <Button title="Register" onPress={signupHandler} />
        <Button title="Already Registered? Login" onPress={loginHandler} /> */}
        {/* <Button title="Visit as Visitor" onPress={VisitorHandler} /> */}
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "AfterSmile-Regular",
    color: colors.backgroundlight,
    fontSize: 50,
    marginBottom: 30,
  },
  container: {
    flex: 1,
    // alignItems: "stretch",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderColor: colors.backgroundlight,
    borderWidth: 2,
    borderRadius: 10,
    width: "80%",
    marginVertical: 22,
    padding: 10,
  },
  label: {
    fontFamily: "Philosopher-Bold",
    color: colors.backgroundlight,
    fontSize: 20,
    marginLeft: 10,
    alignItems: "flex-start",
  },
  buttonText: {
    fontFamily: "Philosopher-Regular",
    color: "#ffffff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  buttonStyle: {
    margin: 10,
    width: 170,
    height: 30,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
