import { StyleSheet, Text, View, ScrollView,  Image} from 'react-native'
import React, { useState, useEffect } from 'react';
import { colors } from '../helper/Color';
import FloatingWindow from "./FloatingWindow";
import DropdownBox from './DropdownBox';
import Input from './Input';

export default function ImageFilterManager({navigation, route}) {
  const [images, setImages] = useState([]);

  // Log to debug
  console.log(route.params);

  useEffect(() => {
    if (route.params?.images) {
      setImages(route.params.images);
    }
  }, [route.params?.images]);

  return (
    <ScrollView contentContainerStyle={styles.Container}>
      {images.map((img) => (
        <Image key={img.uri} source={{ uri: img.uri }} style={styles.image} resizeMode="cover" />
      ))}
      <FloatingWindow navigation={navigation} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap', //  show images in a grid
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
