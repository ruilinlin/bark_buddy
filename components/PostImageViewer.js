import React from 'react';
import { Image, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

const ImageViewer = ({ images }) => {
  return (
    <Swiper
      style={{ height: 300 }}
      showsButtons={false}
      autoplay={false}
    >
      {images.map((img) => (
        <Image
          key={img.uri} // Using URI as key
          source={{ uri: img.uri }}
          style={{ width: width, height: 300 }}
          resizeMode="cover"
        />
      ))}
    </Swiper>
  );
};


export default ImageViewer;
