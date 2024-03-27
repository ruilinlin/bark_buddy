import GradientBackground from '../components/Background'
import { StyleSheet, Text, View, FlatList,Button,SafeAreaView,Alert, } from 'react-native'
import React from 'react'

export default function PostScreen() {
//  const users = userPostsList();
  return (
    <GradientBackground>
    <View style={styles.container}>
      <FlatList style={styles.postcontianer}
//      data = {users}
      />
      <Text>PostScreen</Text>
    </View>
    </GradientBackground>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
 //   background:background,
    justifyContent:"center",
  },
  postcontianer:{

  },
})