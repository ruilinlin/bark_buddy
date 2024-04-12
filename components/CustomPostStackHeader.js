import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StepProgress from './StepProgress'
export default function CustomPostStackHeader() {
  return (
    <View style={styles.header}>
      <StepProgress/>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: 'rgba(99, 60, 92, 0.4)',
    paddingTop: 30,
    paddingHorizontal: 20,
  },
})