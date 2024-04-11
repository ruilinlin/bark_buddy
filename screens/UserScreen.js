import {
  StyleSheet,
  Image,
  Text,
  View,
  FlatList,
  Button,
  SafeAreaView,
  Alert,
  Pressable,
  ScrollView,
  Dimensions,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import LightBackGround from "../components/LightBackGround";
import { colors } from "../helper/Color";
import PostItem from "../components/PostItem";
import ImageViewer from "../components/PostImageViewer";
// import LinearGradient from 'react-native-linear-gradient';
import { auth } from "../firebase-files/firebaseSetup";
import {
  searchUsersByUserId,
  writeToDB,
  updateToDB,
} from "../firebase-files/firestoreHelper";
import Input from "../components/Input";
import PressableButton from "../components/PressableButton";
import axios from "axios";
import { breedApiKey } from "@env";
import DropdownBox from "../components/DropdownBox";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function UserScreen() {
  const [user, setUser] = useState(null);
  // const [name, setName] = useState("");
  // const [country, setCountry] = useState("");
  // const [state, setState] = useState("");
  // const [city, setCity] = useState("");
  // const [docId, setDocId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [puppyName, setPuppyName] = useState("");
  const [puppyAge, setPuppyAge] = useState("");
  const [puppyBread, setPuppyBread] = useState("");
  const [breedList, setBreedList] = useState([]);
  const [breedKey, setBreedKey] = useState("");

  // console.log("it is breedLabel", puppyBread);
  // console.log("it is selectedBreed", breedKey);

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await searchUsersByUserId(auth.currentUser.uid); // Fetch user data from DB
        if (userData) {
          // If user data exists, pre-fill the input fields
          console.log("it is userData", userData);
          setUser(userData);
          // setName(userData.name);
          // setCountry(userData.country);
          // setState(userData.state);
          // setCity(userData.city);
          // setDocId(userData.id);
          // if (userData.puppyList && userData.puppyList.length > 0) {
          //   // If user has puppyList data available, set the user.puppyList state
          //   setUser({
          //     ...user,
          //     pet: userData.puppyList,
          //   });
          // }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchData();
    console.log(user);
  }, []);

  useEffect(() => {
    async function fetchBreeds() {
      const options = {
        method: "GET",
        url: "https://dogbreeddb.p.rapidapi.com/",
        headers: {
          "X-RapidAPI-Key": breedApiKey,
          "X-RapidAPI-Host": "dogbreeddb.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        // console.log(response.data);
        setBreedList(
          response.data.map((breed) => ({
            label: breed.breedName,
            value: breed.id,
            img: breed.imgSourceURL,
          }))
        );
      } catch (error) {
        console.error(error);
      }
    }
    fetchBreeds();
    // console.log(breedList);
  }, []);

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

  const invalidAgeAlert = () =>
    Alert.alert(
      "Invalid Age",
      "No negative number or letters or empty for Age.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]
    );

  // const user = {
  //   id: "1",
  //   name: "test",
  //   avatar: require("../assets/favicon.png"),
  //   email: "puppylover@gmail.com",
  //   livein: "Vancouver",
  //   pet: [
  //     { id: 1, name: "puppy one", age: 3, gender: "girl" },
  //     { id: 2, name: "puppy two", age: 3, gender: "girl" },
  //   ],
  // };

  const images = [
    { id: "1", uri: require("../assets/1.png") },
    { id: "2", uri: require("../assets/2.png") },
    { id: "3", uri: require("../assets/3.png") },
    { id: "4", uri: require("../assets/1.png") },
    { id: "5", uri: require("../assets/2.png") },
    { id: "6", uri: require("../assets/3.png") },
    { id: "7", uri: require("../assets/2.png") },
    { id: "8", uri: require("../assets/3.png") },
    { id: "9", uri: require("../assets/3.png") },
  ];

  const { width, height } = Dimensions.get("window");

  function avatarClickHandler() {
    console.log("clicked");
  }

  function cardClickHandler(pet) {
    console.log("puppy card clicked");
    setSelectedPet(pet);
    setModalVisible(true);
  }

  const saveHandler = () => {
    validateInputs();
  };

  const validateInputs = () => {
    const isEmpty =
      puppyName.length === 0 ||
      puppyAge.length === 0 ||
      puppyBread.length === 0;
    if (isEmpty) {
      emptySubmissionAlert();
    }

    // Check if the entered value is a positive integer
    const isValidAge = /^\d+$/.test(puppyAge) && parseInt(puppyAge) > 0;
    if (!isValidAge) {
      invalidAgeAlert();
    }

    if (!isEmpty && isValidAge) {
      // if (isEdit) {
      //   const updatedData = { title, description, date };
      //   updateToDB(id, updatedData, "events");
      // } else {
      //   writeNewEntry();
      // }
      setModalVisible(false);
    }
  };

  function puppyNameChangeHandler(name) {
    setPuppyName(name);
  }
  function puppyAgeChangeHandler(age) {
    setPuppyAge(age);
  }
  function puppyBreedChangeHandler(breed) {
    setPuppyBreed(breed);
  }

  return (
    <LightBackGround>
      <SafeAreaView style={styles.container}>
        {user && ( // Check if user is not null
          <>
            <View style={styles.userinformationContainer}>
              <Pressable onPress={avatarClickHandler}>
                <Image
                  source={require("../assets/favicon.png")}
                  style={styles.avatorContainer}
                  resizeMode="cover"
                />
              </Pressable>
              <Text style={styles.Username}>{user.name}</Text>
              <Text
                style={styles.location}
              >{`${user.country}, ${user.state}, ${user.city}`}</Text>
            </View>
            <ScrollView
              horizontal
              contentContainerStyle={styles.petcardContainer(
                user.puppyList ? user.puppyList.length : 1
              )}
            >
              {user.puppyList && user.puppyList.length > 0 ? (
                <>
                  {user.puppyList.map((puppy) => (
                    <View key={puppy.id.toString()} style={styles.card}>
                      <Pressable onPress={() => cardClickHandler(puppy)}>
                        <Image
                          source={puppy.img}
                          style={styles.cardAvatar}
                          resizeMode="cover"
                        />
                        <Text style={styles.cardInfo}>{puppy.name}</Text>
                        <Text style={styles.cardInfo}>Age: {puppy.age}</Text>
                        <Text style={styles.cardInfo}>
                          Breed: {puppy.breed}
                        </Text>
                      </Pressable>
                    </View>
                  ))}
                  {/* Add a card for adding a new puppy */}
                  <View style={styles.card}>
                    <Pressable onPress={() => setModalVisible(true)}>
                      <Text style={styles.addPuppyText}>
                        Add your puppy here!
                      </Text>
                    </Pressable>
                  </View>
                </>
              ) : (
                // If pet data is not available, render only one card for adding a new puppy
                <View>
                  <Pressable
                    onPress={() => setModalVisible(true)}
                    style={styles.card}
                  >
                    <MaterialCommunityIcons
                      name="dog"
                      size={24}
                      color="black"
                    />
                    <Text style={styles.addPuppyText}>
                      Add your puppy here!
                    </Text>
                  </Pressable>
                </View>
              )}
            </ScrollView>

            <FlatList
              style={styles.listContainer}
              data={images}
              renderItem={({ item }) => (
                <View
                  style={[
                    styles.imageContainer,
                    { width: width / 3 - 5, height: width / 3 },
                  ]}
                >
                  <Image
                    source={item.uri}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="contain"
                  />
                </View>
              )}
              keyExtractor={(item) => item.id}
              numColumns={3}
            />
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  {/* {selectedPet && (
                <> */}
                  <Input
                    label="Name *"
                    value={puppyName}
                    onChangeText={puppyNameChangeHandler}
                  />
                  <Input
                    label="Age *"
                    value={puppyAge}
                    onChangeText={puppyAgeChangeHandler}
                  />
                  <Text style={styles.label}>Breed *</Text>
                  <DropdownBox
                    data={breedList}
                    placeholder="Select Breed"
                    value={breedKey}
                    setValue={setBreedKey}
                    setLabel={setPuppyBread}
                  />
                  <View style={styles.buttonsContainer}>
                    <PressableButton
                      backgroundColor={colors.backgrounddark}
                      onPress={() => setModalVisible(false)}
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
                  {/* </>
              )} */}
                </View>
              </View>
            </Modal>
          </>
        )}
      </SafeAreaView>
      <View></View>
    </LightBackGround>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  userinformationContainer: {
    // flex: 1,
    height: 150,
    marginTop: 30,
    alignItems: "center",
  },
  avatorContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.lightavatarborder,
    marginBottom: 20,
    borderWidth: 5,
    borderColor: colors.lightavatarborder,
  },
  Username: {
    fontSize: 20,
    color: colors.commentsfontcolor,
    paddingLeft: 10,
  },
  cardAvatar: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: colors.lightavatarborder,
  },
  card: {
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 110,
    borderRadius: 20,
    backgroundColor: colors.lightavatarborder,
    marginLeft: 30,
    marginTop: 20,
  },
  petcardContainer: (numItems) => ({
    flex: 1,
    // height: 200,
    // width: "100%",
    // width: numItems <= 1 ? "100%" : "auto", // Adjust width based on number of items
    alignItems: numItems <= 1 ? "center" : "flex-start", // Center items if there's only one, otherwise align to start
    justifyContent: numItems <= 1 ? "center" : "flex-start", // Center items if there's only one, otherwise align to start
    margin: 30,
    marginLeft: numItems <= 1 ? 0 : 30,
  }),
  cardInfo: {
    fontSize: 12,
    color: colors.commentsfontcolor,
  },
  listContainer: {
    // flex:2,
    width: "100%",
    // marginTop:0,
    // marginBottom:0,
  },
  imageContainer: {
    flex: 1,
    flexDirection: "column",
    margin: 1,
  },
  location: {
    fontSize: 12,
    color: colors.commentsfontcolor,
  },
  titleText: {
    fontSize: 20,
    color: colors.fontcolortitle,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    paddingBottom: 55,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    margin: 10,
  },
  label: {
    fontSize: 12,
    color: colors.commentsfontcolor,
    margin: 5,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});
