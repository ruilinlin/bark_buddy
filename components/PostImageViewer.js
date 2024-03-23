import React from 'react';
import { Image, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

const ImageViewer = ({ images }) => {
  console.log('ImageViewer images prop:', images);
  <Swiper
    style={{ height: 300 }}
    showsButtons={false} 
    autoplay={false} 
  >
    {images.map((img) => (
      <Image
        key={img.id}
        source={img.uri}
        style={{ width: width, height: 300}}
        resizeMode="cover"
      />
    ))}
  </Swiper>
};

export default ImageViewer;
