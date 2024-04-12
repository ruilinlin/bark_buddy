import GradientBackground from '../components/DarkBackGround'
import PostItem from '../components/PostItem'
import {PostComments} from '../components/PostComments'
import PressableButton from '../components/PressableButton'
import { StyleSheet,Image, Text, View, FlatList,Button,SafeAreaView,Alert, Pressable, ScrollView,Dimensions} from 'react-native'
import React, { useState,useRef } from 'react';
import { colors } from '../helper/Color';
import { useNavigation } from '@react-navigation/core';
import { Animated } from 'react-native';
import DynamicHeader from '../components/DynamicHeader'


export default function PostScreen({navigation}) {
  // const navigation =useNavigation();
  const [ModalVisible, setModalVisible] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [showPostStack,setShowPostStack]= useState(false); 

  const showAddButton = true;

  const posts = [{id: '1', name: 'test', avatar: require("../assets/favicon.png")},
                {id: '2', name: 'test', avatar: require("../assets/favicon.png")},
                ];

  const comments =[{id: '1', name: 'test', avatar: require("../assets/favicon.png"),comments:"Mobile Application Development SEC 05 Spring 2024 "},
                  {id: '2', name: 'test', avatar: require("../assets/favicon.png"),comments:"Mobile Application Development SEC 05 Spring 2024 "},
                  {id: '3', name: 'test', avatar: require("../assets/favicon.png"),comments:"Mobile Application Development SEC 05 Spring 2024 "},]
                  
  const stories = [
    { id: '1', username: 'iiamcharlie', avatar: require("../assets/favicon.png") },
    { id: '2', username: 'iiamcharles', avatar: require("../assets/favicon.png") },
  ];

                            
  function handleCommentClick(){
    setModalVisible(true);
    console.log(setModalVisible);
  }

  function handleShowPostStack(){
    setShowPostStack(true);
    navigation.navigate("PostNavigator");
  }

  return (
    <GradientBackground colors={colors}>
      <View style={styles.container}>
          <DynamicHeader title="Post" scrollY={scrollY} showAddButton={showAddButton} 
          onPress = {() => {
            handleShowPostStack();
          }}/>
          
          <ScrollView horizontal style={styles.storiesContainer}>
          {stories.map((story)=>(
          <View key={story.id} style={styles.story}>
            <Image source={story.avatar} style={styles.storyAvatar}/>
            <Text style={styles.storyUsername}>{story.username}</Text>
          </View>
          ))}
        </ScrollView>

        <FlatList
          style={styles.listContainer}
          data={posts}
          renderItem={({ item }) => (
            <PostItem postItemname={item.name} onCommentClick={handleCommentClick} />
          )}
          keyExtractor={item => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          />  
               

         {ModalVisible && (
           <PostComments comments={comments} setModalVisible={setModalVisible}/>
         )}
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   background:background,
    justifyContent: "center",
  },
  storiesContainer: {
    marginTop:35,
    marginBottom:15,
  },
  listContainer:{
    marginTop:0,
    marginBottom:0,
  },
  story: {
    alignItems: 'center',
    margin:10,
    marginBottom:30,
  },
  storyAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: colors.backgroundlight,
  },
  storyUsername: {
  color:colors.fontcolor,
  },
  postCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // white with 30% opacity
    borderRadius: 8, 
    padding: 10, 
  },
})