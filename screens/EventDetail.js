import { StyleSheet, Text, View, Image, Alert, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import PressableButton from "../components/PressableButton";
import { colors } from "../helper/Color";
import GradientBackground from "../components/DarkBackGround";
import { doc, getDoc } from "firebase/firestore";
import { auth, database } from "../firebase-files/firebaseSetup";
import { readFromDB, deleteFromDB } from "../firebase-files/firestoreHelper";
import { getAddressFromCoordinates } from "../components/LocationManager";
import { mapsApiKey } from "@env";
import { useFocusEffect } from "@react-navigation/native";

export default function EventDetail({ navigation, route }) {
  const { id, userId } = route.params;
  const [item, setItem] = useState(null);
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");

  const isCurrentUserOwner = userId === auth.currentUser.uid;
  const fetchData = async () => {
    try {
      const itemData = await readFromDB(id, "events");
      setItem(itemData); // Set the fetched data to the state
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]); // Dependency array to trigger the effect when id changes

  // Refresh data when the screen focuses
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  // const joinHandler = () => {
  //   Alert.alert("Successfully Joined!");
  // };

  const editHandler = () => {
    navigation.navigate("AddEvent", {
      id: id,
      userId: userId,
    });
  };

  const deleteHandler = () => {
    deleteFromDB(id, "events");
    navigation.goBack();
  };

  const description = item?.description;
  const title = item?.title;
  const date = item?.date;
  useEffect(() => {
    const getLocation = async () => {
      try {
        const address = await getAddressFromCoordinates(
          item?.location.latitude,
          item?.location.longitude
        );
        const imageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${item?.location.latitude},${item?.location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${item?.location.latitude},${item?.location.longitude}&key=${mapsApiKey}`;
        setImage(imageUrl);
        setLocation(address);
      } catch (error) {
        console.error("Error fetching address:", error);
        return null;
      }
    };
    getLocation();
  }, [item]);

  // console.log("item:", item);

  return (
    <GradientBackground colors={colors}>
      <View style={styles.allContainer}>
        <Image
          style={styles.image}
          source={image ? { uri: image } : null}
          resizeMode="cover"
        />

        <View style={styles.overlay}>
          <Text style={styles.overlayText}>
            {date?.toDate().toString().substring(0, 21)}
          </Text>
        </View>
        <View style={styles.eventInfo}>
          <Text style={styles.eventName}>{title}</Text>
          <View style={styles.container}>
            <View style={styles.eventDetailContainer}>
              <Text style={styles.eventDetail}>Location: {location}</Text>
              <Text style={styles.eventDetail}>
                Time: {date?.toDate().toString().substring(0, 21)}
              </Text>
              {/* <Text style={styles.eventDetail}>Organizer: {userId}</Text> */}
            </View>
            <View style={styles.buttonContainer}>
              {isCurrentUserOwner && (
                <View style={styles.buttonContainer}>
                  <PressableButton
                    backgroundColor={colors.backgroundlight}
                    onPress={editHandler}
                  >
                    <Text style={styles.buttonText}>Edit</Text>
                  </PressableButton>
                  <PressableButton
                    backgroundColor={colors.backgroundlight}
                    onPress={deleteHandler}
                  >
                    <Text style={styles.buttonText}>Delete</Text>
                  </PressableButton>
                </View>
              )}
            </View>
          </View>
          <View style={styles.introductionContainer}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <Text style={styles.introduction}>{description} </Text>
            </ScrollView>
          </View>
        </View>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  allContainer: { marginTop: "25%" },
  eventInfo: {
    marginVertical: 25,
    marginHorizontal: 15,
  },
  image: {
    width: "100%",
    aspectRatio: 2, // set the height 1/2 as its width
    // borderRadius: 5,
  },
  overlay: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // with opacity
    padding: 10,
    borderRadius: 5,
  },
  overlayText: {
    color: "#ffffff",
  },
  container: {
    flexDirection: "row",
  },
  eventDetailContainer: {
    flex: 3,
  },
  eventName: {
    fontSize: 30,
    color: "#ffffff",
    paddingVertical: 10,
  },
  eventDetail: {
    fontSize: 20,
    color: "#ffffff",
    paddingBottom: 5,
  },
  buttonContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  buttonText: {
    color: "#ffffff",
  },
  introductionContainer: {
    marginVertical: 5,
  },
  introduction: { color: "#ffffff", fontSize: 18, lineHeight: 25 },
});
