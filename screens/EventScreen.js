import { FlatList, StyleSheet, Text, View, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import EventItem from "../components/EventItem";
import GradientBackground from "../components/DarkBackGround";
import EventDetail from "./EventDetail";
import AddEvent from "./AddEvent";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, database } from "../firebase-files/firebaseSetup";
import { colors } from "../helper/Color";
import { getAddressFromCoordinates } from "../components/LocationManager";
import { mapsApiKey } from "@env";
import { customMapStyle } from "../components/encodeCustomMapStyle";

export default function EventScreen({ navigation, selectedScreen }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Set up a listener to get realtime data from firestore
    const unsubscribe = onSnapshot(
      query(
        collection(database, "events"),
        selectedScreen === "Event"
          ? null
          : where("userId", "==", auth.currentUser.uid)
      ),
      async (querySnapshot) => {
        if (querySnapshot.empty) {
          Alert.alert("You need to add an event");
        }
        const fetchedEvents = [];
        for (const doc of querySnapshot.docs) {
          const data = doc.data();
          if (data && data.location) {
            try {
              const location = await getAddressFromCoordinates(
                data.location.latitude,
                data.location.longitude
              );
              const eventData = {
                ...data,
                id: doc.id,
                location: location,
                // imageUrl: `https://maps.googleapis.com/maps/api/staticmap?center=${data.location.latitude},${data.location.longitude}&zoom=14&size=400x200&maptype=terrain&markers=color:red%7Clabel:L%7C${data.location.latitude},${data.location.longitude}&key=${mapsApiKey}`,
                imageUrl: `https://maps.googleapis.com/maps/api/staticmap?center=${data.location.latitude},${data.location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${data.location.latitude},${data.location.longitude}&style=${customMapStyle}&key=${mapsApiKey}`,
              };
              console.log("this is mapurl", eventData)
              fetchedEvents.push(eventData);
            } catch (error) {
              console.error("Error fetching address:", error);
            }
          }
        }

        setEvents(fetchedEvents);
      },
      (error) => {
        Alert.alert("Error", error.message);
      }
    );

    return () => {
      console.log("unsubscribe");
      unsubscribe();
    };
  }, [selectedScreen]);

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
      <View style={styles.container}>
        <FlatList
          data={events}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: "25%" },
});
