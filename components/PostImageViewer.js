import React from 'react';
import { Image, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

const ImageViewer = ({ images }) => {
  // console.log('ImageViewer images prop:', images);
  return ( 
    <Swiper
      style={{ height: 300, margin: 0, padding: 0 }}
      showsButtons={false}
      autoplay={false}
    >
      {images.map((img) => (
        <Image
          key={img.id}
          source={img.uri} 
          style={{ width: width, height: 300, margin: 0 }}
          resizeMode="cover"
        />
      ))}
    </Swiper>
  );
};

export default ImageViewer;
