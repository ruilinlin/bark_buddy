import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { colors } from "../helper/Color";

export default function Input({
  custominputborder,
  Customstyle,
  label,
  value,
  onChangeText,
  onPressIn,
  error,
}) {

  return (
    <View style={Customstyle}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input,custominputborder]}
        value={value}
        onChangeText={onChangeText}
        onPressIn={onPressIn}
        placeholder="Add Your Comment Here!"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    color: colors.commentsfontcolor,
    margin: 5,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  input: {
    fontSize: 12,
    color: colors.commentsfontcolor,
    borderWidth: 1,
    color: colors.commentsfontcolor,
    borderRadius: 20,
    padding: 10,
    margin: 5,
  },
  errorText: {
    color: "#ffffff",
    margin: 3,
  },
});
