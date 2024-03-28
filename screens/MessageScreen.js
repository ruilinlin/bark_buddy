import { StyleSheet,Image, Text, View, FlatList,Button,SafeAreaView,Alert, Pressable, ScrollView,Dimensions} from 'react-native';
import React from "react";
import MessageItem from "../components/MessageItem";
import LightBackGround from '../components/LightBackGround';
import { colors } from '../helper/Color';
import { MaterialIcons } from '@expo/vector-icons';
import ChatBubble from '../components/ChatBubble';

export default function MessageScreen() {
  const friendmessage =[{id: '1', name: 'test', avatar: require("../assets/favicon.png"),message:"Mobile Application Development SEC 05 Spring 2024 "},
  {id: '2', name: 'test', avatar: require("../assets/favicon.png"),message:"Mobile Application Development SEC 05 Spring 2024 "},
  {id: '3', name: 'test', avatar: require("../assets/favicon.png"),message:"Mobile Application Development SEC 05 Spring 2024 "},]
  const strangermessage =[{id: '1', name: 'test', avatar: require("../assets/favicon.png"),message:"Mobile Application Development SEC 05 Spring 2024 "},
  {id: '2', name: 'test', avatar: require("../assets/favicon.png"),message:"Mobile Application Development SEC 05 Spring 2024 "},
  {id: '3', name: 'test', avatar: require("../assets/favicon.png"),message:"Mobile Application Development SEC 05 Spring 2024 "},]

  function handleAccept(){

  }
  function handleReject(){

  }
  function hadleAddNotification(){

  }

  return (
    <LightBackGround >
       <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <SafeAreaView style={styles.container}>   
      <Text style={styles.title}>Pending Strangers requests</Text>
    <View style={styles.FriendMessageContainer}>
      <MessageItem message={friendmessage}/>
    </View>
    <Text style={styles.title}>Pending Friends requests</Text>
    <View style={styles.StrangerMessageContainer}>
        <MessageItem message={strangermessage} handleAccept={handleAccept} handleReject={handleReject}/>
    </View>
    </SafeAreaView> 
    </View>
    <MaterialIcons name="notification-add" size={35} color={colors.lightavatarborder} onPress={hadleAddNotification} style={styles.floatingButton}/>
    </LightBackGround>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center',      
    width:"98%",
  },
  FriendMessageContainer:{
    backgroundColor:colors.lightavatarborder,
    flex:1,
    borderRadius:20,
  },
  StrangerMessageContainer:{
    flex:2
  },
  floatingButton: {
    position: 'absolute', 
    right: 30,
    bottom: 30, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  title:{
    fontSize:16,
    color:colors.fontcolortitle,
    margin:10,
  },
});
