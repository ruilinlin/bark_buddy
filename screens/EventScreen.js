import { FlatList, StyleSheet, Text, View, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import EventItem from "../components/EventItem";
import GradientBackground from "../components/DarkBackGround";
import EventDetail from "./EventDetail";
import AddEvent from "./AddEvent";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, database } from "../firebase-files/firebaseSetup";
import { colors } from "../helper/Color";
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
          setEvents([]);
          Alert.alert("You need to add an event");
          return;
        }
        // loop through this querySnapshot (forEach) => a bunch of docSnapshot
        // call .data() on each documentsnapshot
        let newArray = [];
        querySnapshot.forEach((doc) => {
          // Check if location and imageUrl exist, if not, assign default values
          const data = doc.data();
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

  // function itemPressHandler(eventItem) {
  //   console.log(eventItem);
  //   navigation.navigate("EventDetail", { data: eventItem, selectedScreen });
  // }

  const renderItem = ({ item }) => (
    <EventItem
      name={item.title}
      location={item.location}
      time={item.date.toDate().toString().substring(0, 21)}
      imageUrl={item.imageUrl}
      eventId={item.id}
      userId={item.userId}
      selectedScreen={selectedScreen}
    />
  );
  return (
    <GradientBackground colors={colors}>
      <View>
        <FlatList
          data={events}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({});
