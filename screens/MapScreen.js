import React, { useState, useEffect } from "react";
import { Text, Button, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { collection, onSnapshot, query } from "firebase/firestore";
import { database } from "../firebase-files/firebaseSetup";

export default function MapScreen() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Set up a listener to get all the latlng of events
    const unsubscribe = onSnapshot(
      query(collection(database, "events")),
      async (querySnapshot) => {
        const fetchedEvents = [];
        for (const doc of querySnapshot.docs) {
          const data = doc.data();
          fetchedEvents.push({
            title: data.title,
            location: data.location,
          });
        }

        setEvents(fetchedEvents);
        console.log(fetchedEvents);
      },
      (error) => {
        Alert.alert("Error", error.message);
      }
    );

    return () => {
      console.log("unsubscribe");
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Request permission to access the device's location
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      // Get the device's current location
      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  return (
    <>
      {currentLocation ? (
        <MapView style={styles.map} initialRegion={currentLocation}>
          <Marker
            coordinate={currentLocation}
            title="Your current location"
            pinColor="red"
          />
          {events.map((event, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: event.location.latitude,
                longitude: event.location.longitude,
              }}
              title={event.title}
              pinColor="blue"
            />
          ))}
        </MapView>
      ) : (
        <View style={styles.messageContainer}>
          <Text style={styles.waitMessage}>Please wait ...</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 },
  waitMessage: {
    textAlign: "center",
    fontSize: 30,
    fontFamily: "AfterSmile-Regular",
  },
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
