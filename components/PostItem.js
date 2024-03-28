import { StyleSheet, Text, View, Image, Dimensions ,TouchableOpacity, Pressable} from 'react-native'; 
// import UserAvatar from 'react-native-user-avatar';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react'
import { colors } from '../helper/Color';
import ImageViewer from './PostImageViewer';
import { useNavigation } from '@react-navigation/core';
import {fetchDataList} from "../firebase-files/firestoreHelper"

export default function PostItem({postItemname,onCommentClick}) {
  const navigation = useNavigation(); 
  const [liked, setLiked] = useState(false);
  const [isClickComments, setIsClickComments] =useState(false);
  const describe = "Here is my favorate avatar genarate by my dog!"
  const likenumbers = "90"
  const commentsnumbers ="90"
  const images = [{id: '1', uri: require('../assets/1.png') },
                  {id: '2', uri: require('../assets/2.png') },
                  {id: '3', uri: require('../assets/3.png') },]
                  
  const {width}= Dimensions.get("window");

  // const [userId, setUserId] = useState("");
  // const [likenumbers,setLikeNumbers] = useState(0);
  // const [commentnumbers,setConmmentNumbers] = useState(0);

    // {when we have createpost feature, we will use this real fetch function replace the hard-work fake data}
    // useEffect(() => {
    //   if (CollectionName) {
    //     const fetchDataList = async () => {
    //       try {
    //         const data = await fetchDataList (CollectionName);
    //         if (data) {
    //           setUserId(data.userId);
    //           setLikeNumbers(data.likenumbers);
    //           setConmmentNumbers(data.commentsnumbers);
    //         }
    //       } catch (error) {
    //         Alert.alert('Error fetching activity', error.message);
    //       }
    //     };
    //     fetchDataList();
    //   }
    // }, []);
    
  const dynamicStyles = StyleSheet.create({
    postContainer: {
      width: width, 
      height: 400,
    },
  });

  function handleClickComment(){
    setIsClickComments(true);
  }
 
  return (
    <View style={styles.container}>
      <View style={dynamicStyles.postContainer}>
        <View style={styles.userinformationContainer}>
          <Pressable onPress={()=>navigation.navigate("User")}>
            <Image
              source={require('../assets/favicon.png')}
              style={styles.avatorContainer}
              resizeMode="cover" 
            />
          </Pressable>
          {/* <UserAvatar size={100} name="Avishay Bar" src= {postitemavator}  /> */}
          <Text style={styles.Username}>{postItemname}</Text>
        </View >
        <ImageViewer images={images} />
      </View >

      <View style={styles.userinformationContainer}>
      <TouchableOpacity onPress={() => setLiked(!liked)}>
        <AntDesign
          name={liked ? "heart" : "hearto"}
          size={24}
          color={liked ? colors.backgroundlight : colors.backgroundlight}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onCommentClick}>
        <FontAwesome5 name="comment-alt" size={22} color={colors.backgroundlight} style={styles.icon}/>
      </TouchableOpacity>
    </View>
    
    <View style={styles.userinformationContainer}>
      <Text style={styles.textsmall}>{likenumbers} likes</Text>
      <Text style={styles.textsmall}>{commentsnumbers} comments</Text>
    </View>
    <Text style={styles.describe}>{describe}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginBottom:50,  
  },
  avatorContainer:{
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor:colors.backgroundlight,
    marginBottom:20,
  },
  userinformationContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%', 
    paddingLeft: 10, 
  },
  othercomments:{

  },
  Username:{
    fontSize:16,
    color:colors.fontcolortitle,
    paddingLeft: 10, 
    marginBottom:20,
  },
  listContainer:{
    marginTop:30,
    marginBottom:30,
  },
  interactiveContainer:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  icon:{
    marginLeft:10,
    marginRight:20,
  },
  textsmall:{
    fontSize:11,
    color:colors.fontcolortitle,
    marginBottom:10,
    margin:10,
  },
  textgenaral:{
    fontSize:14,
    color:colors.fontcolortitle,
    paddingLeft: 10, 
  },
  describe:{
    fontSize:14,
    color:colors.fontcolorpost,
    paddingLeft: 10, 
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%', 
  },
})