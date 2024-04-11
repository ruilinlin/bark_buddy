import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../helper/Color';
import FloatingWindow from "./FloatingWindow";

export default function ImageFilterManager({navigation, route}) {
  return (
    <View style={styles.Container}>
        <FloatingWindow navigation={navigation} />
    </View>
  )
}

const styles = StyleSheet.create({
  Container: { 
    flex: 1,
    backgroundColor: colors.lightbackgroundlight,

    
  },
})