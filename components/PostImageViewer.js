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
      {images.map((image, index) => {
        
        // Check if image is a string or an object and set imageSource accordingly
        let imageSource = {};
        if (typeof image === 'string') {
          imageSource = { uri: image }; 
        } else if (typeof image === 'object' && image.uri) {
          imageSource = { uri: image.uri }; // If it's an object, use the uri property
        } else {
          // Log an error or handle the case where image data is not in expected format
          console.error("Invalid image data", image);
          return null; // Skip rendering this image
        }

        return (
          <View key={index} style={{ width, height: 400 }}>
            <Image
              source={imageSource}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          </View>
        );
      })}
    </Swiper>
  );
};

export default ImageViewer;

