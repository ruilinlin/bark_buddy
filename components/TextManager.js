import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { colors } from "../helper/Color";
import FloatingWindow from "./FloatingWindow";
import DropdownBox from "./DropdownBox";
import Input from "./Input";
import NextButton from "./NextButton";

export default function TextManager({ navigation, route }) {
  const [images, setImages] = useState([]);
  const [tag, setTag] = useState([]);
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedLabel, setSelectedLabel] = useState("");
  const tagList = [
    { label: "Colosseum", value: "Colosseum" },
    { label: "Colosseum1", value: "Colosseum1" },
    // { label: 'Colosseum2', value: 'Colosseum2' },
    // { label: 'Colosseum3', value: 'Colosseum3' },
  ];

  // Toggle selection of a tag
  const handleSelectTag = (tagValue) => {
    setSelectedTags((prev) => {
      const index = prev.indexOf(tagValue);
      if (index > -1) {
        // Tag is currently selected, remove it
        return prev.filter((tag) => tag !== tagValue);
      } else {
        // Tag is not selected, add it
        return [...prev, tagValue];
      }
    });
  };
  // Log to debug
  console.log(route.params);

  useEffect(() => {
    if (route.params?.images) {
      setImages(route.params.images);
    }
  }, [route.params?.images]);

  function handleNext() {
    navigation.navigate("post");
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.Container}
        keyboardShouldPersistTaps="handled"
      >
        {images.map((img) => (
          <Image
            key={img.uri}
            source={{ uri: img.uri }}
            style={styles.image}
            resizeMode="cover"
          />
        ))}
        <FloatingWindow navigation={navigation} />
        <Input
          label="Description"
          value={description}
          onChangeText={setDescription}
          placeholder="Add Your Thoughts Here..."
          multiline={true}
          numberOfLines={4}
          custominputborder={{ borderWidth: 0 }}
          Customstyle={{ fontSize: 20 }}
        />
        <DropdownBox
          data={tagList}
          setValue={setSelectedTags}
          placeholder="Select Tag"
          onSelectTag={handleSelectTag}
          // setLabel={setSelectedLabel}
        />
        {selectedTags &&
          selectedTags.map((tag, index) => (
            <View
              key={index}
              style={{ margin: 5, padding: 5, backgroundColor: "lightgray" }}
            >
              <Text>{tag}</Text>
            </View>
          ))}

        <NextButton
          handleNext={handleNext}
          style={styles.nextButtonContainer}
          text="Post"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap", //  show images in a grid
  },
  image: {
    width: 400,
    height: 400,
    marginVertical: 10,
  },
  Container: {
    flex: 1,
    backgroundColor: colors.lightbackgroundlight,
  },
});
