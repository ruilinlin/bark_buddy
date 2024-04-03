import { Modal,StyleSheet,Image, Text, View, FlatList,Button,SafeAreaView,Alert, Pressable, ScrollView,TouchableOpacity,Dimensions} from 'react-native'
import React, { useState } from 'react'
import { colors } from '../helper/Color';
import Input from './Input';
import { AntDesign } from '@expo/vector-icons';

export const PostComments = ({ comments, setModalVisible }) => {
  const screenHeight = Dimensions.get("window").height;
  const modalHeight = screenHeight * 0.75;
  const [comment,setConmment] = useState("");
  const [error,setError] = useState("");

  const handleCommentSubmit = () =>{
    if(!comment.trim()){
      setError("Please Enter A Comment.")
      return;
    }
    onsubmit(comment);
    setConmment("");
    setError('');
  };

  return (
    <Modal animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={[styles.modalView, { height: modalHeight }]}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Comments</Text>
        </View>          
          {/* Modal content */}
          <FlatList style={styles.commentsContainer}
            data={comments}
            renderItem={({ item }) => (
              <View style={styles.userinformation}>
                <Image source={item.avatar} style={styles.avatorContainer} resizeMode="cover" />
              <View style={styles.commentsmodal}>                               
                <Text style={styles.Username}>{item.name}</Text>
                <Text>{item.comments}</Text>
                </View>   
              </View>
            )}
            keyExtractor={item => item.id}              
            // ListFooterComponent={
            //   <TouchableOpacity style={styles.bottomContainer} onPress={() => setModalVisible(false)}>
            //     <Text>Close</Text>
            //   </TouchableOpacity>
            // }
          />
         <View style={styles.bottomContainer}>
          <Image source={comments.avatar} style={styles.avatorContainerSingle} resizeMode="cover" />
          <Input 
              Customstyle = {styles.inputBox}
              value = {comment}
              onChangeText={setConmment}
              error={error}/>
          <AntDesign name="up" size={22} color="black" onPress={() => setModalVisible(false)} style={styles.backButton}/>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end', 
    backgroundColor: colors.commentsmodal, 
  },

  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
  },
  headerText:{
    fontWeight: "bold",
  },
  headerContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.commentsfontcolor,
    fontSize: 20,
    backgroundColor: '#fff', 
  },
  bottomContainer:{
    flexDirection: 'row',
    padding: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
    color: colors.commentsfontcolor,
    fontSize: 20,
  },
  
  text:{
    color:colors.fontcolor,
  },
  avatorContainer:{
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor:colors.backgroundlight,
  },
  Username:{
    fontSize:13,
    color:colors.commentsfontcolor,
    paddingLeft: 5, 
    // marginBottom:20,
  },
  commentsContainer:{
    paddingLeft: 5, 
  },
  commentsmodal:{
    flexDirection: 'coloumn',
    justifyContent: 'flex-start',
    marginLeft:10,
    width: "88%",

  },
  userinformation:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop:40,
    paddingLeft:5,

  },
  inputBox:{
    width:"70%",
    marginBottom:20,
  },
  backButton:{
    marginLeft:20,
  },
  avatorContainerSingle:{
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor:colors.backgroundlight,
    margin:20,
  },
})