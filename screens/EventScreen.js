import { FlatList, StyleSheet, Text, View, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import EventItem from "../components/EventItem";
import GradientBackground from "../components/DarkBackGround";
import EventDetail from "./EventDetail";
import AddEvent from "./AddEvent";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, database } from "../firebase-files/firebaseSetup";

export default function EventScreen({ navigation, selectedScreen }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // set up a listener to get realtime data from firestore - only after the first render
    const unsubscribe = onSnapshot(
      query(
        collection(database, "events"),
        selectedScreen === "Event"
          ? null
          : where("userId", "==", auth.currentUser.uid)
      ),
      (querySnapshot) => {
        if (querySnapshot.empty) {
          Alert.alert("You need to add an event");
          return;
        }
        // loop through this querySnapshot (forEach) => a bunch of docSnapshot
        // call .data() on each documentsnapshot
        let newArray = [];
        querySnapshot.forEach((doc) => {
          // Check if location and imageUrl exist, if not, assign default values
          const data = doc.data();
          console.log(data);
          const eventData = {
            ...data,
            id: doc.id,
            location: data.location || "Location",
            imageUrl:
              data.imageUrl || "https://reactnative.dev/img/tiny_logo.png",
          };
          // store this data in a new array
          newArray.push(eventData);
        });
        console.log(newArray);
        //updating the events array with the new array
        setEvents(newArray);
      },
      (error) => {
        Alert.alert(error.message);
      }
    );
    return () => {
      console.log("unsubscribe");
      unsubscribe();
    };
  }, [selectedScreen]);

  // const eventDataToDisplay = selectedScreen === "Event" ? events : events;

  function itemPressHandler(eventItem) {
    navigation.navigate("EventDetail", { data: eventItem, selectedScreen });
  }

  const renderItem = ({ item }) => (
    <EventItem
      name={item.name}
      location={item.location}
      time={item.date.toDate().toString().substring(0, 21)}
      imageUrl={item.imageUrl}
      itemPressHandler={itemPressHandler}
      selectedScreen={selectedScreen}
    />
  );
  return (
    <GradientBackground>
      <View>
        <FlatList
          data={events}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        {/* <EventDetail></EventDetail> */}
        {/* <AddEvent></AddEvent> */}
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({});
