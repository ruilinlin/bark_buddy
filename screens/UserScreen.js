import { StyleSheet,Image, Text, View, FlatList,Button,SafeAreaView,Alert, Pressable, ScrollView,Dimensions} from 'react-native'
import React from "react";
import GradientBackground from '../components/Background'
import { colors } from '../helper/Color';
import PostItem from '../components/PostItem'
import ImageViewer from '../components/PostImageViewer';

export default function UserScreen() {
  const user = {
    id: '1', 
    name: 'test', 
    avatar: require("../assets/favicon.png"),
    email: "puppylover@gmail.com",
    livein: "Vancouver",
    pet: [
      {id: 1, name: "puppy one", age: 3, genda: "girl"},
      {id: 2, name: "puppy two", age: 3, genda: "girl"}
    ]
  };

const comments =[{id: '1', name: 'test', avatar: require("../assets/favicon.png"),comments:"Mobile Application Development SEC 05 Spring 2024 "},
    {id: '2', name: 'test', avatar: require("../assets/favicon.png"),comments:"Mobile Application Development SEC 05 Spring 2024 "},
    {id: '3', name: 'test', avatar: require("../assets/favicon.png"),comments:"Mobile Application Development SEC 05 Spring 2024 "},]
    
const stories = [
{ id: '1', username: 'iiamcharlie', avatar: require("../assets/favicon.png") },
{ id: '2', username: 'iiamcharles', avatar: require("../assets/favicon.png") },
];
const images = [{id: '1', uri: require('../assets/1.png') },
{id: '2', uri: require('../assets/2.png') },
{id: '3', uri: require('../assets/3.png') },]


  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
      <View style={styles.userinformationContainer}>
      <Image
            source={require('../assets/favicon.png')}
            style={styles.avatorContainer}
            resizeMode="cover" 
          />
      <Text style={styles.Username}>{user.name}</Text>
      <Text style={styles.Username}>{user.livein}</Text>
      </View>
      <ScrollView horizontal style={styles.petcardContainer}>
          {user.pet.map((pet)=>(
          <View key={pet.id.toString()} style={styles.card}>
            <Image source={user.avatar} style={styles.cardAvatar} resizeMode="cover"/>
            <Text style={styles.cardInfo}>{pet.name}</Text>
            <Text style={styles.cardInfo}>Age: {pet.age}</Text>
            <Text style={styles.cardInfo}>Gender: {pet.genda}</Text>
          </View>
          ))}
        </ScrollView>
      <FlatList 
      style={styles.listContainer}
      data={images}
      renderItem={({item})=>(
        <ImageViewer images={images} />
      )}      
      />
        
      </SafeAreaView>
    <View>
    </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
 flexDirection: 'column',
  },
  userinformationContainer:{
    flex: 1,
    marginTop:30,
    alignItems: "center",
  },  
  avatorContainer:{
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor:colors.backgroundlight,
    marginBottom:20,
  },
  Username:{
    fontSize:16,
    color:colors.fontcolortitle,
    paddingLeft: 10, 
    marginBottom:5,
  },
  card:{
    width:100,
    height:100,
    borderRadius:8,
  },
  petcardContainer:{
    flex: 2,
    width:"100%",
    backgroundColor:"white",
  },
  cardInfo:{

  },
  listContainer:{
    flex:9,
    // marginTop:0,
    // marginBottom:0,
  },
});
