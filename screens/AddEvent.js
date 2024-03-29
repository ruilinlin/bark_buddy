import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import DatePicker from "../components/DatePicker";
import PressableButton from "../components/PressableButton";
import { colors } from "../helper/Color";
import { auth, database } from "../firebase-files/firebaseSetup";
import { readFromDB, updateToDB } from "../firebase-files/firestoreHelper";

export default function AddEvent({ navigation, route }) {
  const isEdit = route.params !== undefined;
  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (isEdit) {
      const { id } = route.params;
      setId(id);
      fetchData(id);
    }
  }, [isEdit, route.params]);

  const fetchData = async (id) => {
    try {
      const itemData = await readFromDB(id, "events");
      setItem(itemData);
      setTitle(itemData.title);
      setDescription(itemData.description);
      setDate(itemData.date.toDate());
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const emptySubmissionAlert = () => {
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
  };

  const saveHandler = () => {
    validateInputs();
  };

  const validateInputs = () => {
    const isEmpty =
      title.length === 0 || description.length === 0 || date == null;
    if (isEmpty) {
      emptySubmissionAlert();
    }

    if (!isEmpty) {
      if (isEdit) {
        const updatedData = { title, description, date };
        updateToDB(id, updatedData, "events");
      } else {
        writeNewEntry();
      }
      navigation.goBack();
    }
  };

  const titleChangeHandler = (title) => {
    setTitle(title);
  };

  const descriptionChangeHandler = (description) => {
    setDescription(description);
  };

  const dateChangeHandler = (date) => {
    setDate(date);
  };

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
          multiline={true}
          numberOfLines={5}
        />
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
