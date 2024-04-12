import React from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity,Text } from 'react-native';
import { colors } from '../helper/Color';
const { width } = Dimensions.get('window');

const FilterGallery = ({ filters, onSelectFilter }) => {
  return (
    <FlatList
      horizontal
      data={filters}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onSelectFilter(item.id)}>
          <View style={styles.filterItem}>
            <Image source={item.uri} style={styles.filterImage} />
            <Text style={styles.Text}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      )}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  filterItem: {
    marginRight: 10, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterImage: {
    width: width /3 , 
    height: width /3 +20, 
    borderRadius: 5, 
  },
  Text: {
    marginTop:2,
    color: colors.shadowColor, 
    fontSize: 12,
  },
});

export default FilterGallery;
