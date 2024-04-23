import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { auth } from "../firebase-files/firebaseSetup";
import GradientBackground from "../components/DarkBackGround";
import { colors } from "../helper/Color";
import PressableButton from "../components/PressableButton";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signupHandler = () => {
    navigation.replace("Signup");
  };
  const loginHandler = async () => {
    try {
      if (!email || !password) {
        Alert.alert("Fields should not be empty");
        return;
      }
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCred);
    } catch (err) {
      console.log(err);
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
        <View style={styles.buttonContainer}>
          <PressableButton
            backgroundColor={colors.backgroundlight}
            onPress={loginHandler}
          >
            <Text style={styles.buttonText}>Login</Text>
          </PressableButton>
          <PressableButton
            backgroundColor={colors.backgroundlight}
            onPress={signupHandler}
            customStyle={styles.buttonStyle}
          >
            <Text style={styles.buttonText}>New User? Create An Account</Text>
          </PressableButton>
        </View>
        {/* <Button title="Login" onPress={loginHandler} />
        <Button title="New User? Create An Account" onPress={signupHandler} /> */}
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  title: {
    // fontWeight: "bold",
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
    color: "white",
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
    width: 200,
    height: 30,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
