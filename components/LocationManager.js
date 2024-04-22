import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { geocodeApiKey } from "@env";
import { colors } from "../helper/Color";

export async function getAddressFromCoordinates(latitude, longitude) {
  try {
    const response = await fetch(
      `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=${geocodeApiKey}`
    );
    const data = await response.json();
    if (data && data.display_name) {
      return data.display_name;
    } else {
      return "Address not found";
    }
  } catch (error) {
    console.error("Error fetching address:", error);
    return "Error fetching address";
  }
}

export default function LocationManager({
  onLocationSelected,
  initialLocation,
}) {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [chosenLocation, setChosenLocation] = useState(null);

  useEffect(() => {
    // Set currentLocation to initialLocation if provided
    if (initialLocation) {
      setCurrentLocation(initialLocation);
      console.log("it is current", currentLocation);
      console.log("it is chosen", chosenLocation);
    }
  }, [initialLocation]);

  useEffect(() => {
    // Fetch the address based on chosen location
    if (chosenLocation) {
      getAddressFromCoordinates(
        chosenLocation.latitude,
        chosenLocation.longitude
      )
        .then((address) => setAddress(address))
        .catch((error) => console.error("Error fetching address:", error));
    }
  }, [chosenLocation]);

  function handleMapPress(event) {
    // Update chosen location when user presses on the map
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setChosenLocation({ latitude, longitude });
  }

  useEffect(() => {
    // Request permission to access the device's location
    if (!initialLocation) {
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
    }
  }, []);

  useEffect(() => {
    const getAddress = async () => {
      if (currentLocation) {
        try {
          const address = await getAddressFromCoordinates(
            currentLocation.latitude,
            currentLocation.longitude
          );
          setAddress(address);
        } catch (error) {
          console.error("Error fetching address:", error);
        }
      }
    };
    getAddress();
  }, [currentLocation]);

  useEffect(() => {
    // Pass the chosen location to the parent component
    onLocationSelected(chosenLocation || currentLocation);
  }, [chosenLocation, currentLocation]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Selected Location *</Text>
      <TextInput
        style={styles.addressText}
        value={address || ""}
        editable={false}
      />
      {currentLocation ? (
        <MapView
          style={styles.map}
          initialRegion={currentLocation}
          onPress={handleMapPress}
        >
          <Marker coordinate={currentLocation} />
          {chosenLocation && (
            <Marker coordinate={chosenLocation} pinColor="blue" />
          )}
        </MapView>
      ) : (
        <View style={styles.messageContainer}>
          <Text style={styles.waitMessage}>Please wait ...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontSize: 18,
    fontFamily: "Philosopher-Bold",
    color: colors.commentsfontcolor,
    margin: 5,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  map: {
    flex: 1,
  },
  addressText: {
    padding: 10,
    textAlign: "left",
    fontSize: 12,
    color: colors.commentsfontcolor,
  },
  staticMap: {
    width: Dimensions.get("screen").width,
    height: 200,
  },
  button: {
    backgroundColor: "blue",
    color: "white",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    textAlign: "center",
  },
  waitMessage: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
