import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../helper/Color';


export const PostComments = ({comments , setClickComment}) => {
  const modalVisible = Boolean(comments && comments.length > 0);
  return (
  <View style={styles.container}>

    <Modal visible={modalVisible} animationType="slide">
      <View style={styles.modalView}>
        <FlatList
          data={comments}
          renderItem={({ item }) => (
            <Text>{item.comments}</Text>
          )}
          keyExtractor={item => item.id}
          ListFooterComponent = {
            <TouchableOpacity onPress={() => setClickComment(false)}>
              <Text style = {styles.text}>Close</Text>
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