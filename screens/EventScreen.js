import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import EventItem from "../components/EventItem";
import GradientBackground from "../components/Background";
import EventDetail from "./EventDetail";
import AddEvent from "./AddEvent";

// test datas
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
export default function EventScreen() {
  const renderItem = ({ item }) => (
    <EventItem
      name={item.name}
      location={item.location}
      time={item.time}
      imageUrl={item.imageUrl}
    />
  );
  return (
    <GradientBackground>
      <View>
        <FlatList
          data={eventData}
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
