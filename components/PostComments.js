import { Modal,StyleSheet,Image, Text, View, FlatList,Button,SafeAreaView,Alert, Pressable, ScrollView,TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { colors } from '../helper/Color';


export const PostComments = ({comments , setModalVisible}) => {
  // const [modalVisible, setModalVisible] = useState(true);
  // const [isclick, setIsClick] = useState(false)


  return (
  <View style={styles.container}>
    <Modal  animationType="slide">
      <View style={styles.modalView}>
        <FlatList
          data={comments}
          renderItem={({ item }) => (
            <Text>{item.comments}</Text>
          )}
          keyExtractor={item => item.id}
          ListFooterComponent = {
            <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text>Close</Text>
            </TouchableOpacity>}
        />
      </View>
    </Modal>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop:10,  
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  text:{
    color:colors.fontcolor,
  }
})