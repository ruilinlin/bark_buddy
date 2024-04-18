import React, { useState, useEffect } from "react";
import { Text, Button, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function MapScreen() {
  const [currentLocation, setCurrentLocation] = useState(null);

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
          <Marker coordinate={currentLocation} />
        </MapView>
      ) : (
        <Text>Please wait ...</Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 },
});
