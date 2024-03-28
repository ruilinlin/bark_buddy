import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import EventItem from "../components/EventItem";
import GradientBackground from "../components/Background";
import EventDetail from "./EventDetail";
import AddEvent from "./AddEvent";

// test datas for Event screen
const eventData = [
  {
    id: "1",
    name: "Event 1",
    location: "Location 1",
    time: "Time 1",
    imageUrl: "https://reactnative.dev/img/tiny_logo.png",
  },
  {
    id: "2",
    name: "Event 2",
    location: "Location 2",
    time: "Time 2",
    imageUrl: "https://reactnative.dev/img/tiny_logo.png",
  },
  {
    id: "3",
    name: "Event 3",
    location: "Location 3",
    time: "Time 3",
    imageUrl: "https://reactnative.dev/img/tiny_logo.png",
  },
];

// test datas for MyEvent screen
const eventDataForMy = [
  {
    id: "3",
    name: "Event 3",
    location: "Location 3",
    time: "Time 3",
    imageUrl: "https://reactnative.dev/img/tiny_logo.png",
  },
];

export default function EventScreen({ navigation, selectedScreen }) {
  // const [eventDataToDisplay, setEventDataToDisplay] = useState(eventData);

  // useEffect(() => {
  //   if (selectedScreen === "Event") {
  //     setEventDataToDisplay(eventData);
  //   } else if (selectedScreen === "MyEvents") {
  //     setEventDataToDisplay(eventDataForMy);
  //   }
  // }, [selectedScreen]);
  const eventDataToDisplay =
    selectedScreen === "Event" ? eventData : eventDataForMy;

  function itemPressHandler(eventItem) {
    navigation.navigate("EventDetail", { data: eventItem, selectedScreen });
  }

  const renderItem = ({ item }) => (
    <EventItem
      name={item.name}
      location={item.location}
      time={item.time}
      imageUrl={item.imageUrl}
      itemPressHandler={itemPressHandler}
      selectedScreen={selectedScreen}
    />
  );
  return (
    <GradientBackground>
      <View>
        <FlatList
          data={eventDataToDisplay}
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
