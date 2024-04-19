import React from 'react';
import { Image, Dimensions,View} from 'react-native';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

const ImageViewer = ({ images }) => {

  return (
    <Swiper
      style={{ height: 400 }}
      showsButtons={false}
      autoplay={false}
    >
      {images.map((img, index) => {
        // Determine if the image source is a local require or a remote URI
        const imageSource = typeof img.uri === 'string' ? { uri: img.uri } : img.uri;
        return (
          <View key={index} style={{ width, height: 400 }}>
            <Image
              source={imageSource}
              style={{ width: width, height: 400 }}
              resizeMode="cover"
            />
          </View>
        );
      })}
    </Swiper>
  );
};


export default ImageViewer;
