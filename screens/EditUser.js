import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import GradientBackground from "../components/DarkBackGround";
import Input from "../components/Input";
import PressableButton from "../components/PressableButton";
import { colors } from "../helper/Color";
import DropdownBox from "../components/DropdownBox";
import axios from "axios";
import { cityApiKey } from "@env";
import {
  searchUsersByUserId,
  writeToDB,
  updateToDB,
} from "../firebase-files/firestoreHelper";
import { auth } from "../firebase-files/firebaseSetup";

export default function EditUser({ navigation }) {
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
  const [docId, setDocId] = useState("");
  // const [avatar, setAvatarUri] = useState("");

  // console.log(country);
  // console.log(state);
  // console.log(city);

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await searchUsersByUserId(auth.currentUser.uid); // Fetch user data from DB
        if (userData) {
          // If user data exists, pre-fill the input fields
          setName(userData.name);
          setCountry(userData.country);
          setState(userData.state);
          setCity(userData.city);
          setDocId(userData.id);
          setCountryCode(userData.countryCode);
          setStateCode(userData.stateCode);
          // setAvatarUri(imageUri);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchData();
    // fetchStates(countryCode);
    // fetchCities(countryCode, stateCode);
  }, []);

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
    } catch (error) {
      console.error("Error fetching states:", error);
      setStateList([]);
    }
  }

  async function fetchCities(countryCode, stateCode) {
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
    } catch (error) {
      console.error("Error fetching cities:", error);
      setCityList([]);
    }
  }

  useEffect(() => {
    if (countryCode) {
      fetchStates(countryCode);
    }
  }, [countryCode]);

  useEffect(() => {
    if (countryCode && stateCode) {
      fetchCities(countryCode, stateCode);
    }
  }, [countryCode, stateCode]);

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

  function nameChangeHandler(name) {
    setName(name);
  }

  function saveHandler() {
    validateInputs();
  }

  function writeNewUser() {
    const newUser = {
      userId: auth.currentUser.uid,
      name: name,
      country: country,
      countryCode: countryCode,
      state: state,
      stateCode: stateCode,
      city: city,
    };
    writeToDB(newUser, "users");
  }

  function validateInputs() {
    // Validate all the input fields
    const isEmpty =
      name.length === 0 ||
      country.length === 0 ||
      state.length === 0 ||
      city.length === 0;

    // Validate username
    const isNameValid = /^[a-zA-Z0-9_]{4,16}$/.test(name); // Check if username matches the pattern

    if (!isNameValid) {
      invalidNameAlert();
    }

    if (isEmpty) {
      emptySubmissionAlert();
    }

    if (!isEmpty && isNameValid) {
      // save the info to the database and then navigate to the Tabs
      try {
        if (docId) {
          const updatedData = {
            userId: auth.currentUser.uid,
            name: name,
            country: country,
            countryCode: countryCode,
            state: state,
            stateCode: stateCode,
            city: city,
            // picture: picture,
          };
          updateToDB(docId, updatedData, "users");
        } else {
          writeNewUser();
        }
        navigation.goBack();
      } catch (error) {
        // Handle database error
        console.error("Error saving to database:", error);
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
          placeholder={country ? `${country}` : "Select Country"}
          setValue={setCountryCode}
          setLabel={setCountry}
        />
        <DropdownBox
          data={stateList}
          placeholder={state ? `${state}` : "Select State"}
          setValue={setStateCode}
          setLabel={setState}
        />
        <DropdownBox
          data={cityList}
          placeholder={city ? `${city}` : "Select City"}
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
    // </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "50%",
    backgroundColor: colors.lightbackgroundlight,
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
    // fontFamily: "Futura-Bold",
    color: "#ffffff",
    fontWeight: "bold",
    width: "90%",
  },
});
