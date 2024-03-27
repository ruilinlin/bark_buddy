import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./components/StackNavigator";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    ...StyleSheet.absoluteFillObject,
    height: null,
  },
});
