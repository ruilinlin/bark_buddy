import { StyleSheet,Image, Text, View, FlatList,Button,SafeAreaView,Alert, Pressable, ScrollView,Dimensions} from 'react-native'
import React from "react";
import LightBackGround from '../components/LightBackGround';
import { colors } from '../helper/Color';
import PostItem from '../components/PostItem'
import ImageViewer from '../components/PostImageViewer';
// import LinearGradient from 'react-native-linear-gradient';


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
{id: '3', uri: require('../assets/3.png') },
{id: '4', uri: require('../assets/1.png') },
{id: '5', uri: require('../assets/2.png') },
{id: '6', uri: require('../assets/3.png') },
{id: '7', uri: require('../assets/2.png') },
{id: '8', uri: require('../assets/3.png') },
{id: '9', uri: require('../assets/3.png') },]

const { width,height } = Dimensions.get('window');

  return (
    <LightBackGround>
      <SafeAreaView style={styles.container}>
      <View style={styles.userinformationContainer}> 
        <Image
            source={require('../assets/favicon.png')}
            style={styles.avatorContainer}
            resizeMode="cover" 
          />

      <Text style={styles.Username}>{user.name}</Text>
      <Text style={styles.location}>{user.livein}</Text>
      </View>
      <View style={styles.titleContainer}>
      <Text style={styles.titleText}>Puppy is Here</Text>
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
          renderItem={({ item }) => (
            <View style={[styles.imageContainer,{ width: width / 3 -5,height: width / 3 }]}>
              <Image source={item.uri} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
            </View>
          )}
          keyExtractor={item => item.id}
          numColumns={3} 
        />
        
      </SafeAreaView>
    <View>
    </View>
    </LightBackGround>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  flexDirection: 'column',
  },
  userinformationContainer:{
    // flex: 1,
    height: 150,
    marginTop:30,
    alignItems: "center",
  },  
  avatorContainer:{
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor:colors.lightavatarborder,
    marginBottom:20,
    borderWidth: 5, 
    borderColor: colors.lightavatarborder,
  },
  titleContainer:{
    width:25,
    height:30,
    marginTop:30,
    alignItems: "center",
    justifyContent: 'center',
    width: '100%',
    marginBottom:10,

  },
  Username:{
    fontSize:20,
    color:colors.commentsfontcolor,
    paddingLeft: 10, 
  },
  cardAvatar:{
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor:colors.lightavatarborder,
  },
  card:{
    alignItems: "center",
    justifyContent: 'center',
    width:150,
    height:110,
    borderRadius:20,
    backgroundColor:colors.lightavatarborder,
    marginLeft:30,
    marginTop:20,
  },
  petcardContainer:{  
    height: 200,
    width:"100%",
    alignContent:"center",
    marginBottom:30,
  },
  cardInfo:{
    fontSize:12,
    color:colors.commentsfontcolor,   
  },
  listContainer:{
    // flex:2,
    width: "100%",
    // marginTop:0,
    // marginBottom:0,
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    margin: 1,
  },
  location:{
    fontSize:12,
    color:colors.commentsfontcolor,
  },
  titleText:{
    fontSize:20,
    color:colors.fontcolortitle,
  },
});
