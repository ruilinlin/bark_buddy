import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import GradientBackground from "../components/DarkBackGround";
import Input from "../components/Input";
import PressableButton from "../components/PressableButton";
import { colors } from "../helper/Color";
import DropdownBox from "../components/DropdownBox";
import axios from "axios";
import { cityApiKey } from "@env";

export default function EditUser() {
  const [name, setName] = useState("");
  // const [pet, setPet] = useState([]);
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [state, setState] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [city, setCity] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  // console.log(country);
  // console.log(state);
  // console.log(city);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await axios.get(
          "https://api.countrystatecity.in/v1/countries",
          {
            headers: {
              "X-CSCAPI-KEY": cityApiKey,
            },
          }
        );
        const countries = response.data.map((country) => ({
          value: country.iso2,
          label: country.name,
        }));
        setCountryList(countries);
      } catch (error) {
        // console.log("Error fetching countries:", error);
      }
    }
    fetchCountries();
  }, []);

  useEffect(() => {
    async function fetchStates(countryCode) {
      try {
        const response = await axios.get(
          `https://api.countrystatecity.in/v1/countries/${countryCode}/states`,
          {
            headers: {
              "X-CSCAPI-KEY": cityApiKey,
            },
          }
        );
        const states = response.data.map((state) => ({
          value: state.iso2,
          label: state.name,
        }));
        setStateList(states);
        // console.log(stateList);
      } catch (error) {
        // console.log("Error fetching states:", error);
        setStateList([]); // Clear the state list in case of an error
      }
    }
    // console.log("it is country", country);
    // console.log("it is country code", countryCode);
    fetchStates(countryCode);
  }, [countryCode]);

  useEffect(() => {
    async function fetchStates(countryCode, stateCode) {
      try {
        const response = await axios.get(
          `https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`,
          {
            headers: {
              "X-CSCAPI-KEY": cityApiKey,
            },
          }
        );
        const cities = response.data.map((city) => ({
          value: city.id,
          label: city.name,
        }));
        setCityList(cities);
        // console.log(cityList);
      } catch (error) {
        // console.log("Error fetching states:", error);
        setStateList([]); // Clear the state list in case of an error
      }
    }
    // console.log("it is state", state);
    // console.log("it is state code", stateCode);
    fetchStates(countryCode, stateCode);
  }, [stateCode]);

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

  // const invalidPetNumAlert = () =>
  //   Alert.alert("Invalid Pet Number", "Pet Number must be a number >= 0.", [
  //     {
  //       text: "Cancel",
  //       onPress: () => console.log("Cancel Pressed"),
  //       style: "cancel",
  //     },
  //     { text: "OK", onPress: () => console.log("OK Pressed") },
  //   ]);

  function nameChangeHandler(name) {
    setName(name);
  }

  // function petNumChangeHandler(petNum) {
  //   setPetNum(petNum);
  // }

  function saveHandler() {
    validateInputs();
  }

  function validateInputs() {
    // Validate all the input fields
    const isEmpty = name.length === 0;

    // Validate username
    const isNameValid = /^[a-zA-Z0-9_]{4,16}$/.test(name); // Check if username matches the pattern

    // Validate petNum
    // const isPetNumValid = /^\d+$/.test(petNum);

    if (!isNameValid) {
      invalidNameAlert();
    }

    // if (!isPetNumValid) {
    //   invalidPetNumAlert();
    // }

    if (isEmpty) {
      emptySubmissionAlert();
    }

    if (!isEmpty && isNameValid) {
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
    // <GradientBackground>
    <View style={styles.container}>
      <View style={styles.inputsContainer}>
        <Input label="Name *" value={name} onChangeText={nameChangeHandler} />
        {/* Need to add Picture picker */}
        <Text>Your current living place *</Text>
        <DropdownBox
          data={countryList}
          placeholder="Select Country"
          setValue={setCountryCode}
          setLabel={setCountry}
        />
        <DropdownBox
          data={stateList}
          placeholder="Select State"
          setValue={setStateCode}
          setLabel={setState}
        />
        <DropdownBox
          data={cityList}
          placeholder="Select City"
          setLabel={setCity}
        />
        {/* <Input
          label="How many puppies do you have? *"
          value={petNum}
          onChangeText={petNumChangeHandler}
        /> */}
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
    // </GradientBackground>
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
