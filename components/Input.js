import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { colors } from "../helper/Color";

export default function Input({
  label,
  value,
  onChangeText,
  onPressIn,
  error,
}) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onPressIn={onPressIn}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.backgroundlight,
    margin: 5,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  input: {
    fontSize: 20,
    color: colors.backgroundlight,
    borderWidth: 2,
    borderColor: colors.backgroundlight,
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
  errorText: {
    color: "#ffffff",
    margin: 3,
  },
});
