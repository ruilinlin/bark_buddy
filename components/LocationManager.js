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

export default function LocationManager({ onLocationSelected }) {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [address, setAddress] = useState("");

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

  useEffect(() => {
    const getAddress = async () => {
      if (currentLocation) {
        // Add this condition
        console.log(currentLocation);
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

  async function getAddressFromCoordinates(latitude, longitude) {
    try {
      const response = await fetch(
        `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=${geocodeApiKey}`
      );
      const data = await response.json();
      // console.log("it is data", data);
      if (data && data.display_name) {
        // console.log(data.display_name);
        return data.display_name;
      } else {
        return "Address not found";
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      return "Error fetching address";
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Selected Location *</Text>
      <TextInput
        style={styles.addressText}
        value={address || ""}
        editable={false}
      />
      {currentLocation ? (
        <MapView style={styles.map} initialRegion={currentLocation}>
          <Marker coordinate={currentLocation} />
        </MapView>
      ) : (
        <Text>Please wait ...</Text>
      )}
    </View>
  );
}

//   const [chosenLocation, setChosenLocation] = useState(null);

//   useEffect(() => {
//     // Get the user's current location
//     async function fetchCurrentLocation() {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         console.log("Permission to access location was denied");
//         return;
//       }
//       let location = await Location.getCurrentPositionAsync({});
//       setCurrentLocation({
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//         latitudeDelta: 0.0922,
//         longitudeDelta: 0.0421,
//       });

//       // Fetch the address based on current location
//       const address = await getAddressFromCoordinates(
//         location.coords.latitude,
//         location.coords.longitude
//       );
//       setAddress(address);
//     }
//     fetchCurrentLocation();
//   }, []);

//   useEffect(() => {
//     // Fetch the address based on chosen location
//     if (chosenLocation) {
//       getAddressFromCoordinates(
//         chosenLocation.latitude,
//         chosenLocation.longitude
//       )
//         .then((address) => setAddress(address))
//         .catch((error) => console.error("Error fetching address:", error));
//     }
//   }, [chosenLocation]);

//   function handleMapPress(event) {
//     // Update chosen location when user presses on the map
//     const { latitude, longitude } = event.nativeEvent.coordinate;
//     setChosenLocation({ latitude, longitude });
//     onLocationSelected(chosenLocation);
//   }

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.addressText}
//         value={address || "Select a location"}
//         editable={false}
//       />
//       {currentLocation && (
//         <MapView
//           style={styles.map}
//           initialRegion={currentLocation}
//           onPress={handleMapPress}
//         >
//           {chosenLocation && (
//             <Marker coordinate={chosenLocation} pinColor="blue" />
//           )}
//         </MapView>
//       )}
//       {/* <PressableButton
//         style={styles.button}
//         onPress={() => onLocationSelected(chosenLocation)}
//       >
//         <Text>Save Location</Text>
//       </PressableButton> */}
//     </View>
// );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
